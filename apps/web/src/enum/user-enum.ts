export const UserTypeEnum = {
  ADMIN: 1,
  DOCTOR: 2,
  PATIENT: 3,
  BUYER: 4,
  SELLER: 5,
} as const;

export type UserTypeEnum = (typeof UserTypeEnum)[keyof typeof UserTypeEnum];
