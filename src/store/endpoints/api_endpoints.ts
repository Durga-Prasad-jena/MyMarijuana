const Api_Endpoint: Record<string, string> = {
  //auth
  loginApi: "auth/login",
  meDataApi:"auth/me",
  logoutApi:"auth/logout",
  forgotPassApi:"auth/forgot-password",
  verifyOtpApi:"auth/verify-otp",
  resetPassApi:"auth/reset-password",
  changePassApi:"auth/change-password",
 
  //doctor
  doctorListingApi: "/admin/doctors/",
  createDoctorApi:"/admin/doctors/create",
  doctorDetailAPi: "/admin/doctors",


  //specialities
   getAllSpecilitiesApi:"/admin/specialities",

   //therapy
   getAllTherapiesApi:"/admin/therapies",

   //insurance
   getAllInsuranceApi:"/admin/insurances",

   //languages
   getAllLanguagesApi:"/admin/languages",


   //subscriptions
   getAllSubscriptionsApi: "/admin/subscription-plans/",
};

export default Api_Endpoint;
