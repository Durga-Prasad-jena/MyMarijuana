import constants from "@/utils/constants";
import  * as yup from "yup";


export const changePasswordSchema = yup.object().shape({
    currentPassword: yup
    .string()
    .min(8, 'password must be atleast eight charactors long')
    .matches(
      constants.PASSWORD_REGEX,
      'Password must contain at least one letter, one number, and one special character',
    )
    .required("Current password is required"),
    newPassword: yup
    .string()
    .min(8, 'password must be atleast eight charactors long')
    .matches(
      constants.PASSWORD_REGEX,
      'Password must contain at least one letter, one number, and one special character',
    )
    .notOneOf([yup.ref("oldPassword")], "New Password must differenet from the old password")
    .required("New password is required"),
    confirmPassword: yup
    .string()
    .min(8, 'password must be atleast eight charactors long')
    .matches(
      constants.PASSWORD_REGEX,
      'Password must contain at least one letter, one number, and one special character',
    )
    .oneOf([yup.ref("newPassword")], "Confirm Passwords must be same with New Password")
    .required("Confirm password is required"),
})