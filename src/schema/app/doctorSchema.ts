import constants from "@/utils/constants";
import * as yup from "yup";

export const doctorCreateSchema = yup.object({
  firstName: yup.string()
      .trim()
      .required("First Name is required")
      .min(3,"First name must be at least three characters"),
    lastName: yup.string()
      .trim()
      .required("Last Name is required")
      .min(3,"Last name must be at least three characters"),
    email: yup.string()
      .trim()
      .email("Enter a valid email")
      .matches(constants.EMAIL_REGEX,"Enter a valid email"),
    phoneCountryCode: yup.string().required("Country code is required"),
    phoneNo: yup.string()
      .trim()
      .required("Phone number is required"),
      // .matches(/^\d+$/, "Phone number must contain only digits")
      // .matches(constants.PHONE_REGEX,"Phone number must be valid"),
    subscriptionPlanId: yup.string().required("Subscription plan is required"),
    specialityIds: yup.array()
      .of(yup.string())
      .min(1, "Select at least one speciality")
      .required("Speciality is required"),
    languageIds: yup.array()
      .of(yup.string())
      .min(1, "Select at least one language")
      .required("Language is required"),
    locations: yup.array()
      .of(
        yup.object({
          street: yup.string().trim().required("Street is required"),
          city: yup.string().trim().required("City is required"),
          state: yup.string().trim().required("State is required"),
          country: yup.string().trim().required("Country is required"),
          postalCode: yup.string()
            .trim()
            .required("Postal code is required")
            .matches(/^\d+$/, "Postal code must contain only digits"),
        })
      )
      .min(1, "At least one location is required"),
});