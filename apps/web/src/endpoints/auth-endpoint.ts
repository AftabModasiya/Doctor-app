const BASE_AUTH_ENDPOINT = '/auth';

const AuthEndpoints = {
	refreshToken: `${BASE_AUTH_ENDPOINT}/refresh`,
	signIn: `${BASE_AUTH_ENDPOINT}/verify-otp`,
	forgotPassword: `${BASE_AUTH_ENDPOINT}/forgot-password-admin`,
	verifyEmail: `${BASE_AUTH_ENDPOINT}/verify-email`,
	verifySubAdminEmail: `${BASE_AUTH_ENDPOINT}/verify-sub-admin-email`,
	verifyToken: `${BASE_AUTH_ENDPOINT}/verifyToken`,
	resetPassword: `${BASE_AUTH_ENDPOINT}/reset-password`,
	logout: `${BASE_AUTH_ENDPOINT}/logout`,
	changePassword: `${BASE_AUTH_ENDPOINT}/change-password`,
	adminLogin: `${BASE_AUTH_ENDPOINT}/admin-login`,
	ssoExchange: `${BASE_AUTH_ENDPOINT}/sso/admin/exchange`
};

export { AuthEndpoints, BASE_AUTH_ENDPOINT };
