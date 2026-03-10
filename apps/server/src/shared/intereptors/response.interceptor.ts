import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { catchError, map, throwError } from 'rxjs';
import {
    TGenericResponse,
    TInitialResponse,
} from '../types/response.type';
import { getAppMetadataKeys } from '../constants/app.constants';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler) {
        const isByPassed = this.reflector.getAllAndOverride<boolean>(
            getAppMetadataKeys().BY_PASS_RESPONSE_INTERCEPTOR_KEY,
            [context.getHandler(), context.getClass()],
        );

        return next.handle().pipe(
            map<TInitialResponse, TGenericResponse | TInitialResponse>((body) => {
                if (isByPassed) return body;

                const response = context.switchToHttp().getResponse<Response>();

                const { statusCode } = response;

                const message = body?.message;

                delete body?.message;

                return {
                    success: true,
                    data: {
                        ...body,
                    },
                    statusCode,
                    message,
                };
            }),
            catchError((err: Error) => {
                return throwError(() => err);
            }),
        );
    }
}