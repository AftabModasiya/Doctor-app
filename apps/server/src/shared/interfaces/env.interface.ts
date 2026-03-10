export interface IEnvironmentVariables {
	NODE_ENV: string;

	DATABASE_HOST: string;
	DATABASE_PORT: number;
	DATABASE_USER: string;
	DATABASE_PASSWORD: string;
	DATABASE_NAME: string;

	WHITELISTED_ORIGINS: Array<string>;

	PG_POOL_MAX: number;
	PG_IDLE_TIMEOUT: number;
	PG_CONNECTION_TIMEOUT: number;
}
