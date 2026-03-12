import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import categoryReducer from "./category/category-slice";
import dashboardReducer from "./dashboard/dashboard-slice";
import degreeReducer from "./degree/degree-slice";
import doctorReducer from "./doctor/doctor-slice";
import medicineReducer from "./medicine/medicine-slice";
import metadataReducer from "./metadata/metadata-slice";
import patientReducer from "./patient/patient-slice";
import prescriptionReducer from "./prescription/prescription-slice";
import specializationReducer from "./specialization/specialization-slice";
import passkeyReducer from "./passkey/passkey-slice";

const rootReducer = combineReducers({
  auth: authReducer,
  patient: patientReducer,
  doctor: doctorReducer,
  specialization: specializationReducer,
  degree: degreeReducer,
  dashboard: dashboardReducer,
  category: categoryReducer,
  medicine: medicineReducer,
  metadata: metadataReducer,
  prescription: prescriptionReducer,
  passkey: passkeyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
