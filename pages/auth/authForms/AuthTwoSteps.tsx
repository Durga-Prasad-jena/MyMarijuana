import { Box, Typography, Button } from "@mui/material";

import CustomFormLabel from "@/theme-components/forms/CustomFormLabel";
import CustomTextField from "@/theme-components/forms/CustomTextField";
import { Stack } from "@mui/system";
import {
  useForgotPassMutation,
  useVerifyOTPMutation,
} from "@/store/endpoints/auth/authApi";
import notify from "@/utils/toast";
import { ApiErrorResponse } from "@/types/api_response_model";
import { useFormik } from "formik";
import { useRef } from "react";
import { verifyOtpSchema } from "@/schema/auth/authSchema";
import { useRouter } from "next/router";

const AuthTwoSteps = ({ ...props }) => {
  const [forgotPass] = useForgotPassMutation();
  const [verifyOTP, { isLoading: isVerifyOtpLoading }] = useVerifyOTPMutation();
  const router = useRouter();

  const inputRefs = Array(6)
    .fill(null)
    .map(() => useRef<HTMLInputElement>(null));



  const formik = useFormik({
    initialValues: {
      otp: ["", "", "", "", "", ""],
    },
    validationSchema: verifyOtpSchema,
    onSubmit: async (values): Promise<void> => {
      try {
        const otp = values.otp.join("");
        const verifyOtpuser = await verifyOTP({
          emailAddress: props.emailAddress,
          otp,
        }).unwrap();
        notify(verifyOtpuser.message, "success");
        if (verifyOtpuser.isVerified) {
          router.push({
            pathname: "/auth/reset-password",
            query: {
              emailAddress: props.emailAddress,
              otp: otp,
            },
          });
        }
      } catch (error) {
        notify((error as ApiErrorResponse)?.data?.message, "error");
      }
    },
  });



  const handleResend = async () => {
    if (!props.isRenderDisable) {
      try {
        const forgotPassUser = await forgotPass({
          emailAddress: props.emailAddress,
        }).unwrap();
        notify(forgotPassUser.message, "success");
        props.setCount(60);
        props.setIsRenderDisable(true);
      } catch (error) {
        notify((error as ApiErrorResponse)?.data?.message, "error");
      }
    }
  };


  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...formik.values.otp];
    newOtp[index] = value;
    formik.setFieldValue("otp", newOtp);

    // Move focus to next field
    if (value && index < 5) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !formik.values.otp[index] && index > 0) {
      const newOtp = [...formik.values.otp];
      newOtp[index - 1] = "";
      formik.setFieldValue("otp", newOtp);
      inputRefs[index - 1]?.current?.focus();
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Box mt={4}>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="code">
            Type your 6 digits security code{" "}
          </CustomFormLabel>
          <Stack spacing={2} direction="row">
            {formik.values.otp.map((digit, index) => (
              <CustomTextField
                key={index}
                inputRef={inputRefs[index]}
                name={`otp[${index}]`}
                value={digit}
                onChange={(e: any) => handleChange(e, index)}
                onKeyDown={(e: any) => handleKeyDown(e, index)}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp?.[index]}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center" },
                }}
                fullWidth
              />
            ))}
          </Stack>
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={isVerifyOtpLoading}
        >
          Verify My Account
        </Button>

        <Stack direction="row" spacing={1} mt={3}>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            Didn&apos;t get the code?
          </Typography>
          <Typography
            fontWeight="500"
            onClick={handleResend}
            sx={{
              textDecoration: "none",
              color: props.isRenderDisable ? "text.disabled" : "primary.main",
              cursor: props.isRenderDisable ? "not-allowed" : "pointer",
              pointerEvents: props.isRenderDisable ? "none" : "auto",
            }}
          >
            Resend
          </Typography>
        </Stack>
      </Box>
    </form>
  );
};

export default AuthTwoSteps;
