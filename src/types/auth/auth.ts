
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
  message: string
  token: string
  user: MedataType
}

export interface MedataResponseModel {
  message:string,
  user:MedataType
}

export interface MedataType {
  role: string
  firstName: string
  lastName: string
  emailAddress: string
  accountStatus?: string
  userId: string
}

export interface verifyOtpResponseModel {
  message: string;
  isVerified: string
}


//login model
export interface LoginModelType{
  emailAddress:string
  password:string
}

export interface VerifyOtpModel {
  emailAddress: string;
  otp: string 
}
export interface ResetPassModelType{
  emailAddress:string
  newPassword:string
  confirmPassword:string
  otp:string
}

export interface  ChangePassModelType {
  oldPassword:string
  newPassword:string
  confirmPassword:string
}
