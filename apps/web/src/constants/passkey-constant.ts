import { BASE_PASSKEY_ENDPOINT } from '@endpoints/passkey-endpoint';

const PasskeyActionTypes = {
  PASSKEY_REGISTER_OPTIONS: `${BASE_PASSKEY_ENDPOINT}/register/options`,
  PASSKEY_REGISTER_VERIFY:  `${BASE_PASSKEY_ENDPOINT}/register/verify`,
  PASSKEY_REGISTER: `${BASE_PASSKEY_ENDPOINT}/register`,
};

export { PasskeyActionTypes };
