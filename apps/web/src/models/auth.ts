import type { UserTypeEnum } from "@enum/user-enum";
import type { TUserDetailsModal } from "@models/user";
import type { TAdministratorCompany } from "@models/company";

type TSupplyUser = {
  id: number;
  companyId: number;
  userId: number;
  userType: number;
};

type TAuthState = {
  loader: {
    loading: boolean;
    sendOtpViaEmail: boolean;
  };
  accessToken: string;
  refreshToken: string;
  permissions: TModulePermission[];

  isRememberMe: boolean;
  userSavedEmail: string;
  isEmailVerified: boolean;
  userDetails: TUserDetailsModal;
  userCompanyType: TAuthUserDetails;
  initialCompanyId: number;
  companyId: number;
  primaryCompany: TAdministratorCompany | null;
  otherCompanies: TAdministratorCompany[];
  // Selected company details with country information (persisted for reliable header display)
  selectedCompanyDetails: TAdministratorCompany | null;
  supplyUser: TSupplyUser | null;
};

type TAuthUserDetails = {
  id: number;
  email: string;
  name: string;
  userType: number;
  companyId: number;
  profileImage: string | null;
  roleId: number;
};

type TAuthGenerateTokenResponse = {
  user: TAuthUserDetails;
  accessToken: string;
  refreshToken: string;
};

type TModulePermission = {
  id: number;
  isActive: boolean;
  all: boolean;
  index: boolean;
  view: boolean;
  module: TModule;
};

type TModule = {
  id: number;
  name: string;
  key: string;
};

//INFO : components props
type TAuthRoutesGuardProps = {
  permissions: TModulePermission[];
};

//INFO : Api payloads

type TLoginApiPayload = {
  userId?: number;
  email: string;
  companyId?: number;
  deviceType: number;
  otp: number;
  deviceToken?: string;
};

type TChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

//INFO: send opt via email api types
type TSendOtpViaEmailApiPayload = {
  email: string;
  password: string;
  companyId?: number;
};

type TSendOtpViaEmailApiResponse = {
  expirySeconds: number;
  userId: number;
  userType: UserTypeEnum;
  user: TAuthUserDetails;
};
type TSsoExchangePayload = {
  ssoCode: string;
};

type TErrorResponse = {
  message: string;
};
export type {
  TSupplyUser,
  TSendOtpViaEmailApiResponse,
  TAuthGenerateTokenResponse,
  TAuthRoutesGuardProps,
  TAuthState,
  TChangePasswordPayload,
  TLoginApiPayload,
  TModulePermission,
  TSendOtpViaEmailApiPayload,
  TErrorResponse,
  TAuthUserDetails,
  TSsoExchangePayload,
};
