import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
} from "@mui/material";
import { loginType } from "../../../src/types/auth/auth";

import { useFormik } from "formik";
import { useLoginMutation } from "@/store/endpoints/auth/authApi";
import { useDispatch } from "react-redux";
import { setTokens } from "@/store/endpoints/reducer/meDataReducer";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import notify from "@/utils/toast";
import { ApiErrorResponse } from "@/types/api_response_model";
import CustomFormLabel from "@/theme-components/forms/CustomFormLabel";
import CustomTextField from "@/theme-components/forms/CustomTextField";
import { loginSchema } from "@/schema/auth/authSchema";

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [rememberMe, setRememberMe] = useState(false);

  //formik setup
  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values): Promise<void> => {
      try {
        const loggedInUser = await login({
          email: values.emailAddress,
          password: values.password,
        }).unwrap();
        dispatch(setTokens({ access_token: loggedInUser?.token }));
        notify("logged in successfully", "success");
        router.push("/");
      } catch (error) {
        notify((error as ApiErrorResponse)?.data?.message, "error");
      }
    },
  });


  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <CustomFormLabel htmlFor="username">Email address*</CustomFormLabel>
          <CustomTextField
            id="emailAddress"
            variant="outlined"
            fullWidth
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.emailAddress && Boolean(formik.errors.emailAddress)
            }
            helperText={
              formik.touched.emailAddress && formik.errors.emailAddress
            }
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Password*</CustomFormLabel>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          disabled={isLoginLoading}
          // component={Link}
          // href="/"
          type="submit"
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthLogin;
