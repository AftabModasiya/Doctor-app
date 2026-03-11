import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JWTForgotAuthGuard extends AuthGuard("jwt-forgot") {}
