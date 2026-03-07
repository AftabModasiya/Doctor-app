import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppModule } from './app.module';
import { setupGracefulShutdown } from 'nestjs-graceful-shutdown';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Add global API prefix
	app.setGlobalPrefix("api");

	// Global validation pipe — transforms payloads and strips unknown fields
	app.useGlobalPipes(new ZodValidationPipe());

	const config = new DocumentBuilder()
		.setTitle('Doctor App API')
		.setDescription('Doctor App REST API')
		.setVersion('1.0')
		.addTag('user')
		.addTag('doctors')
		.addTag('patients')
		.addTag('companies')
		.addTag('prescriptions')
		.addTag('medicines')
		.addTag('auth')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(process.env.PORT ?? 3000);

	setupGracefulShutdown({ app });
}
bootstrap();
