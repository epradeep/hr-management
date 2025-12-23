import * as Yup from "yup";

export const employeeSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  department: Yup.string().required("Department is required"),
});
