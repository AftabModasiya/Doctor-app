import type { RootState } from "@store/root-reducer";
import store from "@store/store";

export type TRootState = RootState;

export type TAppDispatch = typeof store.dispatch;

export type TRehydratePayload = {
  auth: unknown;
  patient?: unknown;
};
