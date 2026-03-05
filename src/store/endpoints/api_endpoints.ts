const Api_Endpoint: Record<string, string> = {
  loginApi: "admin/auth/login",
  meDataApi:"admin/auth/me",
  logoutApi:"admin/auth/logout",
  forgotPassApi:"admin/auth/forgot-password",
  verifyOtpApi:"admin/auth/verify-otp",
  resetPassApi:"admin/auth/reset-password",
  changePassApi:"admin/auth/change-password"
};

export default Api_Endpoint;
