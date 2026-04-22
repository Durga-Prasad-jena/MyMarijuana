const Api_Endpoint: Record<string, string> = {
  //auth
  loginApi: "auth/login",
  meDataApi: "auth/me",
  logoutApi: "auth/logout",
  forgotPassApi: "auth/forgot-password",
  verifyOtpApi: "auth/verify-otp",
  resetPassApi: "auth/reset-password",
  changePassApi: "auth/change-password",

  //doctor
  doctorListingApi: "/admin/doctors/",
  createDoctorApi: "/admin/doctors/create",
  doctorDetailAPi: "/admin/doctors",
  deleteDoctorApi: "/admin/doctors",

  //specialities
  getAllSpecialtiesApi: "/admin/specialities",
  createSpecialtiesApi: "/admin/specialities/create",
  updateSpecialtiesApi: "/admin/specialities",
  deleteSpecialtiesApi: "/admin/specialities",
  specialtiesDetailApi: "/admin/specialities",

  //therapy
  getAllTherapiesApi: "/admin/therapies",

  //insurance
  getAllInsuranceApi: "/admin/insurances",

  //languages
  getAllLanguagesApi: "/admin/languages",
  createLanguagesApi: "/admin/languages/create",
  updateLanguagesApi: "/admin/languages",
  deleteLanguagesApi: "/admin/languages",
  languagesDetailApi: "/admin/languages",

  //subscriptions
  getAllSubscriptionsApi: "/admin/subscription-plans/",

  //faqs
  getAllFaqApi: "/admin/faqs/",
  createFaqApi: "/admin/faqs/create",
  updateFaqApi: "/admin/faqs",
  deleteFaqApi: "/admin/faqs",
  faqDetailApi: "/admin/faqs",

  //contact
  getAllContactApi: "/admin/contact/inquiries",
  contactDetailApi: "/admin/contact/inquiry",
  deleteContactApi: "/admin/contact/inquiry",
};

export default Api_Endpoint;
