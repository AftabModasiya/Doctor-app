export interface IEnvironmentVariables {
	APP_NAME: string;
	NODE_ENV: string;
	PORT: number;
	BASE_URL: string;
	WHITELISTED_ORIGINS: Array<string>;

	DATABASE_HOST: string;
	DATABASE_PORT: number;
	DATABASE_USER: string;
	DATABASE_PASSWORD: string;
	DATABASE_NAME: string;

	PG_POOL_MAX: number;
	PG_IDLE_TIMEOUT: number;
	PG_CONNECTION_TIMEOUT: number;

	JWT_ACCESS_SECRET: string;
	JWT_REFRESH_SECRET: string;
	JWT_FORGOT_PASSWORD_SECRET: string;
	JWT_ACCESS_EXPIRY: string;
	JWT_REFRESH_EXPIRY: string;
	JWT_FORGOT_PASSWORD_EXPIRY: string;

	RP_ID: string;
	RP_ORIGINS: Array<string>;
}
