import { Box, Button, Stack } from "@mui/material";
import { useFormik } from "formik";

import { setPasswordSchema } from "@/schema/auth/authSchema";
import notify from "@/utils/toast";
import { ApiErrorResponse } from "@/types/api_response_model";
import { useRouter } from "next/router";
import { useResetPassMutation } from "@/store/endpoints/auth/authApi";
import CustomFormLabel from "@/theme-components/forms/CustomFormLabel";
import CustomTextField from "@/theme-components/forms/CustomTextField";

const AuthChangePassword = () => {
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
      <Stack>
        <Box>
          <CustomFormLabel htmlFor="username">New Password*</CustomFormLabel>
          <CustomTextField
            placeholder="Enter New Password"
            id="newPassword"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">
            Confirm Password*
          </CustomFormLabel>
          <CustomTextField
            placeholder="Enter Confirm Password"
            id="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        ></Stack>
      </Stack>
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

export default AuthChangePassword;
