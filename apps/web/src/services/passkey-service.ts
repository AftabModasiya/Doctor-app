import { PasskeyEndpoints } from '@endpoints/passkey-endpoint';
import type { TPasskeyRegisterVerifyPayload } from '@models/passkey';
import { POST } from '@shared/services/api-service';

/**
 * Step 1 — Get WebAuthn registration options from the server.
 * POST<T> in this project's api-service means T is the body type.
 * No body needed here so we omit the type arg.
 */
const passkeyRegisterOptionsApi = () => {
  return POST({
    URL: PasskeyEndpoints.registerOptions,
  });
};

/**
 * Step 2 — Send the attestation response (attResp) back to the server for verification.
 * The payload body is TPasskeyRegisterVerifyPayload (contains attResp).
 */
const passkeyRegisterVerifyApi = (payload: TPasskeyRegisterVerifyPayload) => {
  return POST<TPasskeyRegisterVerifyPayload>({
    URL: PasskeyEndpoints.registerVerify,
    body: payload,
  });
};

export { passkeyRegisterOptionsApi, passkeyRegisterVerifyApi };
