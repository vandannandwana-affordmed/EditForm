import { object, string } from "yup";

export const validationSchema = object({
  fullName: string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character",
    )
    .required("Password is required"),
});
