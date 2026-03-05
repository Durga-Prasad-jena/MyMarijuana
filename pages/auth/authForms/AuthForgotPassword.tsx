import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { useFormik } from "formik";

import CustomFormLabel from "@/theme-components/forms/CustomFormLabel";
import CustomTextField from "@/theme-components/forms/CustomTextField";
import notify from "@/utils/toast";
import { ApiErrorResponse } from "@/types/api_response_model";
import { forgotPassSchema } from "@/schema/auth/authSchema";
import { useForgotPassMutation } from "@/store/endpoints/auth/authApi";
import { useRouter } from "next/router";

const AuthForgotPassword = () => {
  const [forgotPass, { isLoading: isForgotPassLoading }] =
    useForgotPassMutation();
  const router = useRouter();

  //formik define
  const formik = useFormik({
    initialValues: {
      emailAddress: "",
    },
    validationSchema: forgotPassSchema,
    onSubmit: async (values): Promise<void> => {
      try {
        const forgotPassUser = await forgotPass({
          emailAddress: values.emailAddress,
        }).unwrap();
        notify(forgotPassUser.message, "success");
        router.push({pathname:"/auth/two-steps",query:{
          emailAddress:values.emailAddress
        }});
      } catch (error) {
        notify((error as ApiErrorResponse)?.data?.message, "error");
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Stack mt={4} spacing={2}>
        <CustomFormLabel htmlFor="reset-email">Email Adddress</CustomFormLabel>
        <CustomTextField
          placeholder="Enter Email"
          id="emailAddress"
          variant="outlined"
          fullWidth
          value={formik.values.emailAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.emailAddress && Boolean(formik.errors.emailAddress)
          }
          helperText={formik.touched.emailAddress && formik.errors.emailAddress}
        />

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={isForgotPassLoading}
        >
          Forgot Password
        </Button>
        <Button
          color="primary"
          size="large"
          fullWidth
          component={Link}
          href="/auth/login"
        >
          Back to Login
        </Button>
      </Stack>
    </form>
  );
};

export default AuthForgotPassword;
