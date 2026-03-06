// import { join } from 'node:path';
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				host: configService.get<string>("DATABASE_HOST"),
				port: configService.get<number>("DATABASE_PORT") || 5432,
				username: configService.get<string>("DATABASE_USER"),
				password: configService.get<string>("DATABASE_PASSWORD"),
				database: configService.get<string>("DATABASE_NAME"),
				autoLoadEntities: true,
				// entities: [
				// 	join(__dirname, '..', 'shared', 'entities', '**', '*.entity.{ts,js}'),
				// ],
				namingStrategy: new SnakeNamingStrategy(),
				synchronize: false,
				logging: configService.get("NODE_ENV") === "development",
				extra: {
					max: configService.get<number>("PG_POOL_MAX") || 10,
					idleTimeoutMillis:
						configService.get<number>("PG_IDLE_TIMEOUT") || 30000,
					connectionTimeoutMillis:
						configService.get<number>("PG_CONNECTION_TIMEOUT") || 2000,
				},
			}),
		}),
	],
})
export class DatabaseModule {}
