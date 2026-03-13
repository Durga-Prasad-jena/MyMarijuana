import * as Yup from "yup";

export const createDoctorValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .max(50, "First name must be at most 50 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .max(50, "Last name must be at most 50 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  // password: Yup.string()
  //   .required("Password is required")
  //   .min(6, "Password must be at least 6 characters"),
  // licenseType: Yup.string().required("License type is required"),
  phoneCountryCode: Yup.string().required("Country code is required"),
  phoneNo: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must contain only digits"),
  doctorProfile: Yup.object().shape({
    professionalTitle: Yup.string().required("Professional title is required"),
    bio: Yup.string().required("Bio Required").max(1000, "Bio must be at most 1000 characters"),
    experienceYears: Yup.number()
      .typeError("Experience must be a number")
      .min(0, "Experience cannot be negative")
      .required("Experience is required"),
    licenseNumber: Yup.string().required("License number is required"),
    licenseState: Yup.string().required("License state is required"),
    acceptingNewClients: Yup.boolean(),
    // emailForPatients: Yup.string().required("EmailForPatient is required").email("Invalid patient email"),
    // phoneForPatients: Yup.string().required("PhoneForPatient is Required").matches(/^\d*$/, "Phone must contain digits only"),
    websiteUrl: Yup.string().required("Website URL is required").url("Invalid website URL"),
    clientFocus: Yup.array().of(Yup.string()),
    specialityId: Yup.string().required("Speciality is required"),
    insuranceId: Yup.string().required("Insurance is required"),
    therapyId: Yup.string().required("Therapy is required"),
    languageId: Yup.string().required("Language is required"),
    qualifications: Yup.array()
      .of(
        Yup.object().shape({
          degree: Yup.string().required("Degree is required"),
          institution: Yup.string().required("Institution is required"),
          yearCompleted: Yup.number()
            .typeError("Year must be a number")
            .min(1900, "Year must be after 1900")
            .max(new Date().getFullYear(), "Year cannot be in the future")
            .required("Year completed is required"),
          credentialType: Yup.string().required("Credential type is required"),
        })
      )
      .min(1, "At least one qualification is required"),
   
  }),
});