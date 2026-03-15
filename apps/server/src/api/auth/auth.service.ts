import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import { TokenType } from "src/shared/constants/enums.constants";
import { ICurrentUser } from "src/shared/interfaces/current-user.interface";
import { ITokenPayload } from "src/shared/interfaces/token.interface";
import { JWTService } from "src/shared/services/jwt.service";
import {
	comparePassword,
	hashPassword,
} from "src/shared/utils/helperMethods.utils";
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
			email: existingUser?.email,
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
		deviceInfoPayload: { deviceToken?: string; deviceIp?: string },
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

		const decodedAccessToken = this.JWTService.verifyAccessToken(accessToken);

		const expiresAt =
			decodedAccessToken && typeof decodedAccessToken.exp === "number"
				? new Date(decodedAccessToken.exp * 1000)
				: null;

		const createDeviceMasterPayload: DeepPartial<UserDevice> = {
			deviceToken,
			deviceIp,
			userId,
			createdBy: userId,
		};

		const newUserDevice = await this.userDeviceService.create(
			createDeviceMasterPayload,
		);

		const accessTokenPayload: DeepPartial<Token> = {
			token: accessToken,
			tokenType: TokenType.ACCESS,
			expiresAt,
			userId,
			userDeviceId: newUserDevice.id,
		};
		const refreshTokenPayload: DeepPartial<Token> = {
			token: refreshToken,
			tokenType: TokenType.REFRESH,
			expiresAt,
			userId,
			userDeviceId: newUserDevice.id,
		};

		await Promise.all([
			this.tokenService.create(accessTokenPayload),
			this.tokenService.create(refreshTokenPayload),
		]);

		return {
			message: this.i18nService.t("success.AUTH.LOGIN_SUCCESSFUL"),
			accessToken,
			refreshToken,
		};
	}

	async refreshUser(tokenPayload: ITokenPayload, userId: number) {
		const accessToken = this.JWTService.generateAccessToken(tokenPayload);

		// Decode access token to get its expiry time
		const decodedAccessToken = this.JWTService.verifyAccessToken(accessToken);
		const expiry =
			decodedAccessToken && typeof decodedAccessToken.exp === "number"
				? new Date(decodedAccessToken.exp * 1000)
				: null;

		await this.tokenService.updateByQuery(
			{ user: { id: userId }, tokenType: TokenType.ACCESS },
			{ token: accessToken, expiresAt: expiry, updatedBy: userId },
		);

		return accessToken;
	}

	async processPasswordChangeRequest(
		new_password: string,
		old_password: string,
		userId: number,
	) {
		const existingUser = await this.userService.findOneByQuery({
			where: { id: userId },
		});

		if (!existingUser)
			throw new NotFoundException(this.i18nService.t("error.USER.NOT_FOUND"));

		const passwordMatch = await comparePassword(
			old_password,
			existingUser.password,
		);

		if (!passwordMatch)
			throw new BadRequestException(
				this.i18nService.t("error.USER.OLD_PASSWORD_INCORRECT"),
			);

		// Prevent setting the same password again
		if (new_password === old_password)
			throw new BadRequestException(
				this.i18nService.t("error.USER.SAME_PASSWORD"),
			);

		const hashedPassword = await hashPassword(new_password);

		return this.userService.update(userId, {
			password: hashedPassword,
			updatedBy: userId,
		});
	}

	logout(user: ICurrentUser) {
		return Promise.all([
			this.tokenService.hardDeleteByQuery({ userId: user.id }),
			this.userDeviceService.hardDeleteByQuery({ userId: user.id }),
		]);
	}
}
