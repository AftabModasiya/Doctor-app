export const getAppMetadataKeys = () => {
	return {
		BY_PASS_RESPONSE_INTERCEPTOR_KEY: "byPassResponseInterceptor",
	};
};

export const getNodeEnvironments = () => {
	return {
		LOCAL: "local",
		DEVELOPMENT: "development",
		STAGING: "staging",
		PRODUCTION: "production",
	};
};

export const getHttpStatusCodes = () => {
	return {
		INTERNAL_SERVER_ERROR: 500,
	};
};

export const getTokenAudience = () => {
	return {
		ACCESS_TOKEN: "accessToken",
		REFRESH_TOKEN: "refreshToken",
		FORGOT_PASSWORD_TOKEN: "forgotPasswordToken",
	};
};

export const getPasswordLength = () => {
	return {
		MIN: 8,
		MAX: 16,
	};
};

export const getQuerySortOrder = () => {
	return {
		ASC: "ASC",
		DESC: "DESC",
	} as const;
};
