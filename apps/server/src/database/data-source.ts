import { join } from "node:path";
import { config } from "dotenv";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

config();

export default new DataSource({
	type: "postgres",
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT) || 5432,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	entities: [join(__dirname, "..", "api", "**", "*.entity.{ts,js}")],
	migrations: [join(__dirname, "migrations", "*.{ts,js}")],
	namingStrategy: new SnakeNamingStrategy(),
	synchronize: false,
	logging: process.env.NODE_ENV === "development",
});
