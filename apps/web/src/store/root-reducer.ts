import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import patientReducer from "./patient/patient-slice";
import dashboardReducer from "./dashboard/dashboard-slice";

const rootReducer = combineReducers({
  auth: authReducer,
  patient: patientReducer,
  dashboard: dashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
