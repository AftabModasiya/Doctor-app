import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import type { ICurrentUser } from "../interfaces/current-user.interface";

/**
 * Decorator to get the current authenticated user from the request.
 * Returns ICurrentUser interface with id, companyId, userType, and email.
 */
export const CurrentUser = createParamDecorator(
	(_data: unknown, context: ExecutionContext): ICurrentUser =>
		context.switchToHttp().getRequest<Request>().user as ICurrentUser,
);
