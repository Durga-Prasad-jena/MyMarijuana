export interface registerType {
  title?: string;
  subtitle?: any;
  subtext?: any;
}

export interface loginType {
  title?: string;
  subtitle?: any;
  subtext?: any;
}

export interface signInType {
  title?: string;
}

//meuser type

export interface LoginResponseModel {
  message: string;
  token: string;
  user: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: any;
  isEmailVerified: boolean;
}

// export interface MedataResponseModel {
//   message:string,
//   user:MedataType
// }

// export interface MedataType {
//   role: string
//   firstName: string
//   lastName: string
//   emailAddress: string
//   accountStatus?: string
//   userId: string
// }

export interface MedataResponseModel {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: any;
  phoneNo: any;
  address: any;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  role: Role;
}

export interface Role {
  roleId: string;
  name: string;
}

export interface verifyOtpResponseModel {
  message: string;
  isVerified: string;
}

//login model
export interface LoginModelType {
  email: string;
  password: string;
}

export interface VerifyOtpModel {
  emailAddress: string;
  otp: string;
}
export interface ResetPassModelType {
  emailAddress: string;
  newPassword: string;
  confirmPassword: string;
  otp: string;
}

export interface ChangePassModelType {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
