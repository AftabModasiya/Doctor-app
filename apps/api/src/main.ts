import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { setupGracefulShutdown } from "nestjs-graceful-shutdown";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Add global API prefix
	app.setGlobalPrefix("api");

	const config = new DocumentBuilder()
		.setTitle("Cats example")
		.setDescription("The cats API description")
		.setVersion("1.0")
		.addTag("cats")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api/docs", app, document);

	await app.listen(process.env.PORT ?? 3000);

	setupGracefulShutdown({ app });
}
bootstrap();
