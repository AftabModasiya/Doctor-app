import { object, string, number } from "yup";

const patientFormSchema = object({
  name: string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  mobile: string()
    .required("Mobile number is required")
    .min(7, "Mobile must be at least 7 digits"),
  age: number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(0, "Age cannot be negative")
    .max(120, "Age cannot exceed 120"),
  gender: string()
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Invalid gender"),
  address: string().required("Address is required"),
  bloodGroup: string()
    .required("Blood group is required")
    .oneOf(
      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "Invalid blood group",
    ),
  status: string()
    .required("Status is required")
    .oneOf(["active", "inactive"], "Invalid status"),
  companyId: number().required(),
});

export { patientFormSchema };
