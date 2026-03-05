import {
  Box,
  Typography,
  FormGroup,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { loginType } from "../../../src/types/auth/auth";
import { useFormik } from "formik";

import AuthSocialButtons from "./AuthSocialButtons";
import { loginSchema } from "@/schema/auth/authSchema";
import { useLoginMutation } from "@/store/endpoints/auth/authApi";
import notify from "@/utils/toast";
import { ApiErrorResponse } from "@/types/api_response_model";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setTokens } from "@/store/endpoints/reducer/meDataReducer";
import CustomFormLabel from "@/theme-components/forms/CustomFormLabel";
import CustomTextField from "@/theme-components/forms/CustomTextField";

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const router = useRouter()
  const dispatch = useDispatch()


  //formik define and login function
  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values): Promise<void> => {
      try {
        const loggeduser = await login({
          emailAddress:values.emailAddress.trim(),
          password:values.password.trim()
        }).unwrap()
        notify(loggeduser.message,"success")
        dispatch(setTokens({access_token:loggeduser.token}))
        router.push("/")
      } catch (error) {
        notify((error as ApiErrorResponse)?.data?.message,"error")
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

      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
      </Box>

      <Stack>
        <Box>
          <CustomFormLabel htmlFor="username">Email*</CustomFormLabel>
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
            helperText={
              formik.touched.emailAddress && formik.errors.emailAddress
            }
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Password*</CustomFormLabel>
          <CustomTextField
          placeholder="Enter Password"
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
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
           
          </FormGroup>
          <Typography
            component={Link}
            href="/auth/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={isLoginLoading}
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthLogin;
