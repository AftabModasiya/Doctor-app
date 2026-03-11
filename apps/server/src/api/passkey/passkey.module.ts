import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Passkey } from "./entities/passkey.entity";
import { PasskeyController } from "./passkey.controller";
import { PasskeyService } from "./passkey.service";

@Module({
	imports: [TypeOrmModule.forFeature([Passkey])],
	controllers: [PasskeyController],
	providers: [PasskeyService],
})
export class PasskeyModule {}
