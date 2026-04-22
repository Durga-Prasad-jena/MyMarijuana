// import { Pagination } from ".";

// export const licenseTypes = [
//   "Nurse",
//   "Nurse Practitioner",
//   "Physician",
//   "Physician Assistant",
//   "Pharmacist",
//   "Other",
// ];

// export const doctorClientFocusTypes = ["Adults", "Elders", "Teens"];
// export const doctorQualificationCredentialTypes = [
//   "Degree",
//   "Diploma",
//   "Fellowship",
// ];

// export const createDoctorInitialValues = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   phoneCountryCode: "+1",
//   phoneNo: "",
//   subscriptionPlanId: "",
//   specialityIds: [],
//   languageIds: [],
//   locations: [
//     {
//       street: "",
//       city: "",
//       state: "",
//       country: "",
//       postalCode: "",
//       isPrimary: true,
//     },
//   ],
// };

// export interface DoctorApiResponseModel {
//   data: DoctorModel[];
//   pagination: Pagination;
// }

// export interface DoctorModel {
//   doctorId: string;
//   firstName: string;
//   lastName: string;
//   avatar: null;
//   createdAt: Date;
//   title: string;
//   bio: null;
//   experienceYears: null;
//   acceptingNewClients: boolean;
//   email: null;
//   phone: null;
//   specialties: string[];
//   subscription: SubscriptionModel;
// }

// export interface SubscriptionModel {
//   planName: string;
// }

// //create doctor p[ayload]
// export interface CreateDoctorPayload {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneCountryCode: string;
//   phoneNo: string;
//   specialityIds: string[];
//   languageIds: string[];
//   locations: Location[];
//   subscriptionPlanId: string;
// }

// export interface Location {
//   street: string;
//   city: string;
//   state: string;
//   country: string;
//   postalCode: string;
//   isPrimary: boolean;
// }

// //detail
// export interface DoctorDetailResponse {
//   doctorId: string;
//   role: string;
//   title: string;
//   professionalTitle: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   avatar: string;
//   phoneCountryCode: string;
//   phoneNo: string;
//   isActive: boolean;
//   isEmailVerified: boolean;
//   createdAt: string;
//   updatedAt: string;
//   bio: string;
//   experienceYears: number;
//   licenseType: string;
//   websiteUrl: string;
//   licenseNumber: string;
//   licenseState: string;
//   licenseVerified: boolean;
//   acceptingNewClients: boolean;
//   emailForPatients: string;
//   phoneForPatients: string;
//   qualifications: Qualification[];
//   specialties: string[];
//   therapies: string[];
//   languages: string[];
//   insurances: string[];
//   locations: Location[];
//   clientFocus: string[];
//   // activeSubscription: SubscriptionModel
// }

// // export interface SubscriptionModel{
// //   activeSubscription:
// // }

// export interface Qualification {
//   degree: string;
//   institution: string;
//   yearCompleted: number;
//   credentialType: string;
//   displayOrder: number;
// }

// export interface Location {
//   street: string;
//   city: string;
//   state: string;
//   country: string;
//   postalCode: string;
//   isPrimary: boolean;
// }


// // export interface  UpdateDoctorPayload
// export interface UpdateDoctorProfilePayload {
//   sessionPrice: number,
//   professionalTitle: string
//   experienceYears: number
//   licenseNumber: string
//   licenseType: string
//   licenseState: string
//   licenseVerified: boolean
//   verifiedBy: string
//   acceptingNewClients: boolean
//   websiteUrl: string
//   generateAvatarUploadUrl: boolean
//   generateMediaUploadUrls: boolean
//   mediaCount: number
//   mediaType: string
//   mediaContentType: string
//   qualifications: Qualification[],
// }

// export interface Qualification {
//   degree: string
//   institution: string
//   yearCompleted: number
//   credentialType: string
//   displayOrder: number
// }

import { Pagination } from ".";

export const licenseTypes = [
  "Nurse",
  "Nurse Practitioner",
  "Physician",
  "Physician Assistant",
  "Pharmacist",
  "Other",
];

// export const doctorClientFocusTypes = ["Adults", "Elders", "Teens"];
// export const doctorQualificationCredentialTypes = [
//   "Degree",
//   "Diploma",
//   "Fellowship",
// ];

export const createDoctorInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneCountryCode: "+1",
  phoneNo: "",
  subscriptionPlanId: "",
  specialityIds: [],
  languageIds: [],
  locations: [
    {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      isPrimary: true,
    },
  ],
};

export interface DoctorApiResponseModel {
  data: DoctorModel[];
  pagination: Pagination;
}

export interface DoctorModel {
  doctorId: string;
  firstName: string;
  lastName: string;
  avatar: null;
  createdAt: Date;
  title: string;
  bio: null;
  experienceYears: null;
  acceptingNewClients: boolean;
  email: null;
  phone: null;
  specialties: string[];
  subscription: SubscriptionModel;
  status: string
}

export interface SubscriptionModel {
  planName: string;
  status:string
  subscriptionPlan: SubscriptionPlanModel
}

export interface SubscriptionPlanModel{
  name: string
}

//create doctor p[ayload]
export interface CreateDoctorPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNo: string;
  specialityIds: string[];
  languageIds: string[];
  locations: PayloadLocation[];
  subscriptionPlanId: string;
}

export interface PayloadLocation {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isPrimary: boolean;
}

//detail
// export interface DoctorDetailResponse {
//   doctorId: string;
//   role: string;
//   title: string;
//   professionalTitle: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   avatar: string;
//   phoneCountryCode: string;
//   phoneNo: string;
//   isActive: boolean;
//   isEmailVerified: boolean;
//   createdAt: string;
//   updatedAt: string;
//   bio: string;
//   experienceYears: number;
//   licenseType: string;
//   websiteUrl: string;
//   licenseNumber: string;
//   licenseState: string;
//   licenseVerified: boolean;
//   acceptingNewClients: boolean;
//   emailForPatients: string;
//   phoneForPatients: string;
//   qualifications: Qualification[];
//   specialties: string[];
//   therapies: string[];
//   languages: string[];
//   insurances: string[];
//   locations: Location[];
//   clientFocus: string[];
//   // activeSubscription: SubscriptionModel
// }

export interface DoctorDetailResponse {
  doctorId: string
  role: string
  slug: string
  title: string
  professionalTitle: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  phoneCountryCode: string
  phoneNo: string
  status: string
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
  sessionPrice: number
  experienceYears: number
  licenseType: string
  websiteUrl: string
  licenseNumber: string
  licenseState: string
  licenseVerified: boolean
  verifiedBy: string
  acceptingOnlineClients: boolean
  acceptingInPersonClients: boolean
  acceptingInsurance: boolean
  qualifications: Qualification[]
  specialties: string[]
  therapies: string[]
  languages: string[]
  insurances: string[]
  media: Medum[]
  locations: Location[]
  clientFocus: string[]
  activeSubscription: ActiveSubscription
}

export interface Qualification {
  degree: string
  institution: string
  yearCompleted: number
  // credentialType: string
  displayOrder: number
}

export interface Medum {
  mediaId: string
  url: string
  mediaType: string
  displayOrder: number
}

export interface Location {
  clinicName: any
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  latitude: string
  longitude: string
  isPrimary: boolean
  phone: string
  email: string
}

export interface ActiveSubscription {
  subscriptionPlanName: string
  planPrice: string
  startDate: string
  endDate: string
  status: string
}


// export interface SubscriptionModel{
//   activeSubscription:
// }

export interface Qualification {
  degree: string;
  institution: string;
  yearCompleted: number;
  // credentialType: string;
  displayOrder: number;
}

export interface Location {
  street: string;
  city: string;
  state: string;
  country: string;
  // postalCode: string;
  isPrimary: boolean;
}


// export interface  UpdateDoctorPayload
export interface UpdateDoctorProfilePayload {
  sessionPrice: number,
  professionalTitle: string
  experienceYears: number
  licenseNumber: string
  licenseType: string
  licenseState: string
  licenseVerified: boolean
  verifiedBy: string
  acceptingNewClients: boolean
  websiteUrl: string
  generateAvatarUploadUrl: boolean
  generateMediaUploadUrls: boolean
  mediaCount?: number
  // mediaType: string
  // mediaContentType: string
  qualifications: Qualification[],
  mediaItems?: MediaItemType[]
}

export interface MediaItemType {
  contentType: "image/jpeg"| "video/mp4" | "image/png"
}

export interface Qualification {
  degree: string
  institution: string
  yearCompleted: number
  // credentialType: string
  displayOrder: number
}

