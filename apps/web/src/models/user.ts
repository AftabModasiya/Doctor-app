type TUserDetailsModal = {
  id: number;
  name: string;
  email: string;
}

type TUserProfileEditPayload = {
  name?: string;
  email?: string;
}

export type {
  TUserDetailsModal,
  TUserProfileEditPayload
}
