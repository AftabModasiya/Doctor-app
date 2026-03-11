import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { ICurrentUser } from "src/shared/interfaces/current-user.interface";
import { ITokenPayload } from "src/shared/interfaces/token.interface";
import { JWTService } from "src/shared/services/jwt.service";
import { comparePassword } from "src/shared/utils/helperMethods.utils";
import { DeepPartial, FindOptionsWhere } from "typeorm";
import { Token } from "../token/entities/token.entity";
import { TokenService } from "../token/token.service";
import { UserService } from "../user/user.service";
import { UserDevice } from "../user-device/entities/user-device.entity";
import { UserDeviceService } from "../user-device/user-device.service";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly tokenService: TokenService,
		private readonly userDeviceService: UserDeviceService,
		private readonly JWTService: JWTService,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	async validateUserToken(
		tokenPayload: ITokenPayload,
		where: FindOptionsWhere<Token>,
	): Promise<ICurrentUser> {
		const { id, email } = tokenPayload;

		const [existingUser, isTokenValid] = await Promise.all([
			this.userService.findOneByQuery({
				where: { id, email },
				select: {
					id: true,
					name: true,
				},
			}),
			this.tokenService.findOneWhere(where),
		]);

		if (!existingUser || !isTokenValid)
			throw new UnauthorizedException(
				this.i18nService.t("error.AUTH.SESSION_EXPIRED"),
			);

		return {
			id: existingUser?.id,
			name: existingUser?.name,
		};
	}

	async verifyUserCredentialsForAdmin(email: string, password: string) {
		const existingUser = await this.userService.findOneByQuery({
			where: { email },
		});

		if (!existingUser) {
			throw new BadRequestException(
				this.i18nService.t("error.AUTH.INVALID_CREDENTIAL"),
			);
		}

		if (!existingUser.password)
			throw new BadRequestException(
				this.i18nService.t("error.AUTH.PASSWORD_NOT_CONFIGURED"),
			);

		const isAuthentic = await comparePassword(password, existingUser.password);

		if (!isAuthentic)
			throw new BadRequestException(
				this.i18nService.t("error.AUTH.INVALID_CREDENTIAL"),
			);

		return existingUser;
	}

	async loginAdmin(
		userId: number,
		email: string,
		deviceInfoPayload: { deviceToken?: string; deviceIp: string },
	) {
		const { deviceToken, deviceIp } = deviceInfoPayload;

		const tokenPayload: ITokenPayload = {
			id: userId,
			email,
		};

		const [accessToken, refreshToken] = [
			this.JWTService.generateAccessToken(tokenPayload),
			this.JWTService.generateRefreshToken(tokenPayload),
		];

		const accessTokenPayload: DeepPartial<Token> = {
			token: accessToken,
			userId,
		};
		const refreshTokenPayload: DeepPartial<Token> = {
			token: refreshToken,
			userId,
		};

		const createDeviceMasterPayload: DeepPartial<UserDevice> = {
			deviceToken,
			deviceIp,
			userId,
			createdBy: userId,
		};

		await Promise.all([
			this.tokenService.create(accessTokenPayload),
			this.tokenService.create(refreshTokenPayload),
			this.userDeviceService.create(createDeviceMasterPayload),
		]);

		return {
			accessToken,
			refreshToken,
		};
	}
}
