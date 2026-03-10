import path from "node:path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { GracefulShutdownModule } from "nestjs-graceful-shutdown";
import { HeaderResolver, I18nModule } from "nestjs-i18n";
import { ZodSerializerInterceptor, ZodValidationPipe } from "nestjs-zod";
import { DatabaseModule } from "src/database/database.module";
import { GlobalExceptionsFilter } from "src/shared/filters/global-exception.filter";
import { HttpExceptionFilter } from "src/shared/filters/http-exception.filter";
import { ResponseInterceptor } from "src/shared/interceptors/response.interceptor";
import { ZodValidationExceptionFilter } from "../shared/filters/zod-validation-exception.filter";
import { AppController } from "./app.controller";
import { CompanyModule } from "./company/company.module";
import { CompanySettingModule } from "./company-setting/company-setting.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { DegreeModule } from "./degree/degree.module";
import { DoctorModule } from "./doctor/doctor.module";
import { MedicineModule } from "./medicine/medicine.module";
import { MedicinePrescriptionModule } from "./medicine-prescription/medicine-prescription.module";
import { PatientModule } from "./patient/patient.module";
import { PrescriptionModule } from "./prescription/prescription.module";
import { SpecializationModule } from "./specialization/specialization.module";
import { TokenModule } from "./token/token.module";
import { UserModule } from "./user/user.module";
import { UserDeviceModule } from "./user-device/user-device.module";

@Module({
	imports: [
		//* Configuration Modules
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		DatabaseModule,
		GracefulShutdownModule.forRoot(),
		I18nModule.forRoot({
			fallbackLanguage: "en",
			loaderOptions: {
				path: path.join(__dirname, "..", "..", "/locales/"),
				watch: true,
			},
			resolvers: [new HeaderResolver(["x-lang"])],
			typesOutputPath: path.join(
				__dirname,
				"..",
				"..",
				"generated/i18n.generated.ts",
			),
		}),
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, "../../../web/dist"),
		}),

		//* API Modules
		UserModule,
		UserDeviceModule,
		TokenModule,
		PatientModule,
		DoctorModule,
		SpecializationModule,
		DegreeModule,
		MedicineModule,
		PrescriptionModule,
		MedicinePrescriptionModule,
		CompanyModule,
		CompanySettingModule,
		DashboardModule,
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ZodValidationPipe,
		},
		{
			provide: APP_FILTER,
			useClass: ZodValidationExceptionFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ZodSerializerInterceptor,
		},
		{
			provide: APP_FILTER,
			useClass: GlobalExceptionsFilter,
		},
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor,
		},
	],
})
export class AppModule {}
