import { object, string, number } from "yup";

const specializationFormSchema = object({
  name: string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or less"),
  companyId: number().required(),
});

export { specializationFormSchema };
