import * as yup from "yup";

export const doctorCreateSchema = yup.object({
  firstName: yup.string()
      .trim()
      .required("First Name is required")
      .min(2, "First Name must be at least 2 characters"),
    lastName: yup.string()
      .trim()
      .required("Last Name is required")
      .min(2, "Last Name must be at least 2 characters"),
    email: yup.string()
      .trim()
      .email("Enter a valid email")
      .required("Email is required"),
    phoneCountryCode: yup.string().required("Country code is required"),
    phoneNo: yup.string()
      .trim()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must contain only digits")
      .min(7, "Phone number must be at least 7 digits")
      .max(15, "Phone number cannot exceed 15 digits"),
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