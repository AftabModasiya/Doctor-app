import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import { getNodeEnvironments } from "src/shared/constants/app.constants";
import { TGenericResponse } from "src/shared/types/response.type";
import { IEnvironmentVariables } from "../interfaces/env.interface";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name);

	constructor(
		private readonly configService: ConfigService<IEnvironmentVariables>,
	) {}

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const { ip, method, path: url } = ctx.getRequest<Request>();
		const statusCode = exception.getStatus();

		const responseBody: TGenericResponse = {
			success: false,
			statusCode,
			data: {},
			message: exception?.message,
			stack:
				this.configService.getOrThrow<string>("NODE_ENV") !==
				getNodeEnvironments().PRODUCTION
					? exception?.stack
					: undefined,
		};

		this.logger.error(
			`${method} ${url} ${statusCode} - ${ip}: ${exception?.message}`,
		);

		response.status(statusCode).json(responseBody);
	}
}
