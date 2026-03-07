import { Module } from "@nestjs/common";
import { DegreeController } from "./degree.controller";
import { DegreeService } from "./degree.service";

@Module({
	controllers: [DegreeController],
	providers: [DegreeService],
})
export class DegreeModule {}
