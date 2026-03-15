const BASE_PASSKEY_ENDPOINT = "/passkey";

const PasskeyEndpoints = {
  registerOptions: `${BASE_PASSKEY_ENDPOINT}/register/options`,
  registerVerify: `${BASE_PASSKEY_ENDPOINT}/register/verify`,
};

export { PasskeyEndpoints, BASE_PASSKEY_ENDPOINT };
