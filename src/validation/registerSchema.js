import * as yup from "yup";

export const registerSchema = yup.object({
    fullName: yup
        .string()
        .required("Full Name is required")
        .min(3, "Full Name must be at least 3 characters"),

    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),

    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/\d/, "Password must include at least 1 number"),

    confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),

    terms: yup
        .boolean()
        .oneOf([true], "You must accept the Terms & Conditions"),
});