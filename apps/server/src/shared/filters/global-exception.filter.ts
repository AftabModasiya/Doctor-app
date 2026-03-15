import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import { I18nTranslations } from "generated/i18n.generated";
import { I18nService } from "nestjs-i18n";
import {
	getHttpStatusCodes,
	getNodeEnvironments,
} from "src/shared/constants/app.constants";
import { TGenericResponse } from "src/shared/types/response.type";
import { IEnvironmentVariables } from "../interfaces/env.interface";

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
	private readonly logger = new Logger(GlobalExceptionsFilter.name);

	constructor(
		private readonly configService: ConfigService<IEnvironmentVariables>,
		private readonly i18nService: I18nService<I18nTranslations>,
	) {}

	catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const { ip, method, path: url } = ctx.getRequest<Request>();

		const responseBody: TGenericResponse = {
			success: false,
			statusCode: getHttpStatusCodes().INTERNAL_SERVER_ERROR,
			data: {},
			message:
				exception?.message ??
				this.i18nService.t("error.UNKNOWN.INTERNAL_SERVER_ERROR"),
			stack:
				this.configService.getOrThrow<string>("NODE_ENV") !==
				getNodeEnvironments().PRODUCTION
					? exception?.stack
					: undefined,
		};

		this.logger.error(
			`${method} ${url} ${getHttpStatusCodes().INTERNAL_SERVER_ERROR} - ${ip}: ${exception?.message}`,
		);

		response
			.status(getHttpStatusCodes().INTERNAL_SERVER_ERROR)
			.json(responseBody);
	}
}
