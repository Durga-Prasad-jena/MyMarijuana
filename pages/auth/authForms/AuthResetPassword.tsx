import { Box, Button } from "@mui/material";
import { useFormik } from "formik";

import { setPasswordSchema } from "@/schema/auth/authSchema";
import notify from "@/utils/toast";
import { ApiErrorResponse } from "@/types/api_response_model";
import { useRouter } from "next/router";
import { useResetPassMutation } from "@/store/endpoints/auth/authApi";

const AuthResetPassword = () => {
  const router = useRouter();
  const { emailAddress, otp } = router.query;
  const [resetPass, { isLoading: isResetPassLoading }] = useResetPassMutation();

  //formik define and login function
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: setPasswordSchema,
    onSubmit: async (values): Promise<void> => {
      try {
       if(emailAddress && otp){
         const resetPassUser = await resetPass({
          emailAddress:emailAddress.toString(),
          otp:otp.toString(),
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        }).unwrap()
        notify(resetPassUser.message,"success")
        router.push("/auth/login")
       }
      } catch (error) {
        notify((error as ApiErrorResponse)?.data?.message, "error");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={isResetPassLoading}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default AuthResetPassword;
