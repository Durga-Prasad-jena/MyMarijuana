import constants from "@/utils/constants";
import * as yup from "yup";

//login
export const loginSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .trim()
    .required("Please enter user email address")
    .email("Please enter a valid email address")
    .matches(constants.EMAIL_REGEX, "Please enter a valid email address"),
  password: yup
    .string()
    .trim()
    .required("Please enter password")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      constants.PASSWORD_REGEX,
      "Password must contain at least one letter, one number, and one special character"
    ),
});


//forgot password
export const forgotPassSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .trim()
    .required("Please enter user email address")
    .email("Please enter a valid email address")
    .matches(constants.EMAIL_REGEX, "Please enter a valid email address"),
});



//verify otp
export const verifyOtpSchema = yup.object({
  otp: yup
    .array()
    .of(
      yup
        .string()
        .matches(/^[0-9]$/, "Only number are allowed")
        .required("")
    )
    .min(6, "OTP must be 6 digits")
    .test("all-filled", "All fields are required", (arr) =>
      arr!.every((val) => val !== "")
    ),
});



//set password
export const setPasswordSchema = yup.object().shape({
    newPassword: yup
    .string()
    .trim()
    .min(8, 'password must be atleast eight charactors long')
    .matches(
      constants.PASSWORD_REGEX,
      'Password must contain at least one letter, one number, and one special character',
    )
    .required("Password is required"),
    confirmPassword: yup
    .string()
    .trim()
    .matches(
      constants.PASSWORD_REGEX,
      'Confirm password must match with new password',
    )
    .oneOf([yup.ref("newPassword")], "Confirm Password must be same with New Password")
    .required("Confirm Password is required"),
});
