import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import patientReducer from "./patient/patient-slice";

const rootReducer = combineReducers({
  auth: authReducer,
  patient: patientReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
