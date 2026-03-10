import * as yup from "yup";

export const medicineFormSchema = yup.object().shape({
  name: yup.string().required("Medicine name is required"),
  categoryId: yup.number().required("Category is required"),
  companyId: yup.number().required("Company ID is required"),
});
