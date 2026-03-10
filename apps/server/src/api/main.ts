import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { setupGracefulShutdown } from "nestjs-graceful-shutdown";
import { cleanupOpenApiDoc } from "nestjs-zod";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const origins = JSON.parse(
		process.env.WHITELISTED_ORIGINS || "[]",
	) as string[];

	app.enableCors({
		origin: origins,
		credentials: true,
	});

	// Add global API prefix
	app.setGlobalPrefix("api");

	const config = new DocumentBuilder()
		.setTitle("Doctor App API")
		.setDescription("Doctor App REST API")
		.setVersion("1.0")
		.build();
	const rawDocument = SwaggerModule.createDocument(app, config);
	const document = cleanupOpenApiDoc(rawDocument);
	SwaggerModule.setup("api/docs", app, document);

	await app.listen(process.env.PORT ?? 3000);

	setupGracefulShutdown({ app });
}
bootstrap();
