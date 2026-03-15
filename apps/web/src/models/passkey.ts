/**
 * Passkey / WebAuthn models
 *
 * Payload shapes are based on the SimpleWebAuthn library types which are
 * returned/accepted by the backend (POST /api/passkey/register/options and
 * POST /api/passkey/register/verify).
 */

// ---------------------------------------------------------------------------
// POST /api/passkey/register/options — RESPONSE
// ---------------------------------------------------------------------------
// The server returns PublicKeyCredentialCreationOptionsJSON (SimpleWebAuthn).
// We keep only the fields we need; the rest are passed opaquely to
// startRegistration() from @simplewebauthn/browser.
export type TPasskeyRegisterOptionsResponse = {
  challenge: string;
  rp: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
    displayName: string;
  };
  pubKeyCredParams: Array<{ alg: number; type: string }>;
  timeout?: number;
  attestation?: string;
  excludeCredentials?: Array<{
    id: string;
    type: string;
    transports?: string[];
  }>;
  authenticatorSelection?: {
    authenticatorAttachment?: string;
    requireResidentKey?: boolean;
    residentKey?: string;
    userVerification?: string;
  };
  extensions?: Record<string, unknown>;
};

// ---------------------------------------------------------------------------
// POST /api/passkey/register/verify — REQUEST PAYLOAD
// ---------------------------------------------------------------------------
// After startRegistration() resolves, the returned RegistrationResponseJSON
// object is sent to the server inside an `attResp` key.
export type TPasskeyRegisterVerifyPayload = {
  attResp: {
    id: string;
    rawId: string;
    response: {
      clientDataJSON: string;
      attestationObject: string;
      transports?: string[];
    };
    authenticatorAttachment?: string;
    clientExtensionResults: AuthenticationExtensionsClientOutputs;
    type: string;
  };
};

// ---------------------------------------------------------------------------
// POST /api/passkey/register/verify — RESPONSE
// ---------------------------------------------------------------------------
export type TPasskeyRegisterVerifyResponse = {
  verified: boolean;
  message?: string;
};
