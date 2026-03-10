import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import patientReducer from "./patient/patient-slice";
import doctorReducer from "./doctor/doctor-slice";
import specializationReducer from "./specialization/specialization-slice";
import degreeReducer from "./degree/degree-slice";
import dashboardReducer from "./dashboard/dashboard-slice";
import categoryReducer from "./category/category-slice";

const rootReducer = combineReducers({
  auth: authReducer,
  patient: patientReducer,
  doctor: doctorReducer,
  specialization: specializationReducer,
  degree: degreeReducer,
  dashboard: dashboardReducer,
  category: categoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
