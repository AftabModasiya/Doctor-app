import { object, string, number } from "yup";

const doctorFormSchema = object({
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
    .min(18, "Age must be at least 18")
    .max(100, "Age cannot exceed 100"),
  gender: string()
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Invalid gender"),
  experience: number()
    .typeError("Experience must be a number")
    .required("Experience is required")
    .min(0, "Experience cannot be negative")
    .max(60, "Experience cannot exceed 60 years"),
  graduationDate: string()
    .required("Graduation date is required")
    .test(
      "not-future",
      "Graduation date cannot be in the future",
      (value) => !value || new Date(value) <= new Date(),
    ),
  specializationId: number()
    .typeError("Please select a specialization")
    .required("Specialization is required")
    .min(1, "Please select a valid specialization"),
  degreeId: number()
    .typeError("Please select a degree")
    .required("Degree is required")
    .min(1, "Please select a valid degree"),
  companyId: number().required(),
});

export { doctorFormSchema };
