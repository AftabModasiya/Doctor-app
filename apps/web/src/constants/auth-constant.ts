import { BASE_AUTH_ENDPOINT } from '@endpoints/auth-endpoint';

const AuthActionTypes = {
	AUTH_LOGIN: `${BASE_AUTH_ENDPOINT}/login`,
	AUTH_FORGOT_PASSWORD: `${BASE_AUTH_ENDPOINT}/forgot-password`,
	AUTH_VERIFY_TOKEN: `${BASE_AUTH_ENDPOINT}/verify-forget-password-token`,
	AUTH_RESET_PASSWORD: `${BASE_AUTH_ENDPOINT}/reset-password`,
	AUTH_VERIFY_EMAILS: `${BASE_AUTH_ENDPOINT}/verify-emails`,
	AUTH_VERIFY_SUB_ADMIN_EMAILS: `${BASE_AUTH_ENDPOINT}/subAdmin/verify-email`,
	AUTH_USER_PROFILE_DATA: `${BASE_AUTH_ENDPOINT}/profile-data`,
	AUTH_USER_PROFILE_DATA_UPDATE: `${BASE_AUTH_ENDPOINT}/profile-detail-edit`,
	AUTH_LOGOUT: `${BASE_AUTH_ENDPOINT}/logout`,
	AUTH_CHANGE_PASSWORD: `user/change-password`,
	AUTH_REFRESH_TOKEN: `${BASE_AUTH_ENDPOINT}/refresh-token`
};

export { AuthActionTypes };
