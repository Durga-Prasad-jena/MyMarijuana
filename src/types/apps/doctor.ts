import { Pagination } from ".";

export const licenseTypes = [
  "Nurse",
  "Nurse Practitioner",
  "Physician",
  "Physician Assistant",
  "Pharmacist",
  "Other",
];

export const doctorClientFocusTypes = ["Adults", "Elders", "Teens"];
export const doctorQualificationCredentialTypes = [
  "Degree",
  "Diploma",
  "Fellowship",
];

export const createDoctorInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  licenseType: "",
  phoneCountryCode: "+1",
  phoneNo: "",
  doctorProfile: {
    professionalTitle: "",
    bio: "",
    experienceYears: "",
    licenseNumber: "",
    licenseState: "",
    acceptingNewClients: false,
    emailForPatients: "",
    phoneForPatients: "",
    websiteUrl: "",
    clientFocus: [] as string[],
    specialityId: "",
    insuranceId: "",
    therapyId: "",
    languageId: "",
    qualifications: [
      {
        degree: "",
        institution: "",
        yearCompleted: "",
        credentialType: "",
      },
    ],
    locations: [
      {
        clinicName: "",
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        latitude: "",
        longitude: "",
        isPrimary: true,
      },
    ],
  },
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
  specialties: any[];
}

//create doctor p[ayload]
export interface CreateDoctorPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneCountryCode: string;
  phoneNo: string;
  professionalTitle: string;
  bio: string;
  experienceYears: number;
  licenseType: string;
  websiteUrl: string;
  licenseNumber: string;
  licenseState: string;
  licenseVerified: boolean;
  acceptingNewClients: boolean;
  emailForPatients: string;
  phoneForPatients: string;
  qualifications: Qualification[];
  specialityIds: string[];
  therapyIds: string[];
  languageIds: string[];
  insuranceIds: string[];
  locations: Location[];
  clientFocus: string[];
}

export interface Qualification {
  degree: string;
  institution: string;
  yearCompleted: number;
  credentialType: string;
  displayOrder: number;
}

export interface Location {
  clinicName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  isPrimary: boolean;
  phone: string;
  email: string;
}

//detail
export interface DoctorDetailResponse {
  doctorId: string;
  role: string;
  title: string;
  professionalTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phoneCountryCode: string;
  phoneNo: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  bio: string;
  experienceYears: number;
  licenseType: string;
  websiteUrl: string;
  licenseNumber: string;
  licenseState: string;
  licenseVerified: boolean;
  acceptingNewClients: boolean;
  emailForPatients: string;
  phoneForPatients: string;
  qualifications: Qualification[];
  specialties: string[];
  therapies: string[];
  languages: string[];
  insurances: string[];
  locations: Location[];
  clientFocus: string[];
}

export interface Qualification {
  degree: string;
  institution: string;
  yearCompleted: number;
  credentialType: string;
  displayOrder: number;
}

export interface Location {
  clinicName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  isPrimary: boolean;
  phone: string;
  email: string;
}
