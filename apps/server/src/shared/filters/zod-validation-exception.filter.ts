import {
	ArgumentsHost,
	Catch,
	type ExceptionFilter,
	HttpStatus,
} from "@nestjs/common";
import { ZodValidationException } from "nestjs-zod";
import type { ZodError } from "zod";

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
	catch(exception: ZodValidationException, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const zodError = exception.getZodError() as ZodError;

		response.status(HttpStatus.BAD_REQUEST).json({
			statusCode: HttpStatus.BAD_REQUEST,
			message: zodError?.issues[0]?.message,
			errors: zodError.issues.map((issue) => ({
				path: issue.path.join("."),
				message: issue.message,
				code: issue.code,
			})),
		});
	}
}
