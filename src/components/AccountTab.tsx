import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  CardContent,
  Grid,
  Typography,
  MenuItem,
  Box,
  Avatar,
  Button,
} from "@mui/material";

// images
import { Stack } from "@mui/system";
import BlankCard from "@/components/BlankCard";
import { useChangePasswordMutation, useMeDataQuery } from "@/store/endpoints/auth/authApi";
import notify from "@/utils/toast";
import { useFormik } from "formik";
import CustomFormLabel from "@/theme-components/forms/CustomFormLabel";
import CustomTextField from "@/theme-components/forms/CustomTextField";
import { changePasswordSchema } from "@/schema/auth/changePasswordSchema";

const AccountTab = () => {

  const [changePassword,{isLoading:isChangePasswordLoading} ] =  useChangePasswordMutation();

  //-----------change password-------------
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { resetForm }): Promise<void> => {
      try {
        const result = await changePassword({
          currentPassword: values.currentPassword.trim(),
          newPassword: values.newPassword.trim(),
          confirmNewPassword: values.confirmPassword.trim(),
        }).unwrap();
        console.log("result",result)
        notify(result.message, "success");
        resetForm();
      } catch (error) {
        // notify((error as ApiErrorResponse)?.data?.message, "error");
      }
    },
  });

  //-----------------update profile picture-----------------
  const allowedFileTypes = ["image/png", "image/jpeg", "image/webp"];
  const handleUploadImage = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      if (file.size > 800 * 1024) {
        alert("Image size should be less than 800KB");
        return;
      }
      if (allowedFileTypes.includes(file.type)) {
        const formData = new FormData();
        formData.append("avatar", file);
        // const updatedImage = await updateProfileImage(formData).unwrap();
        // notify(updatedImage.message, "success");
      }
    } catch (error) {
    //   notify((error as ApiErrorResponse)?.data?.message, "error");
    }
  };

  return (
    <Grid container spacing={3} padding={2}>
      {/* Change Profile */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent style={{ minHeight: 450 }}>
            <Typography variant="h5" mb={1}>
              Change Profile
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Change your profile picture from here
            </Typography>
            <Box textAlign="center" display="flex" justifyContent="center">
              <Box>
                <Avatar
                  src={"/images/profile/no_user_image.webp"}
                  alt={"user1"}
                  sx={{ width: 120, height: 120, margin: "0 auto" }}
                />
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                  my={3}
                >
                  <Button variant="contained" color="primary" component="label">
                    Upload
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleUploadImage}
                      //   disabled={isUpdateProfileImageLoading}
                    />
                  </Button>
                </Stack>
                <Typography variant="subtitle1" color="textSecondary" mb={4}>
                  Allowed JPG or PNG or JPEG. Max size of 800K
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>
      {/*  Change Password */}
       <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent style={{ minHeight: 450 }}>
            <Typography variant="h5" mb={0.5}>
              Change Password
            </Typography>
            <Typography color="textSecondary" mb={3}>
              To change your password please confirm here
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="currentPassword"
              >
                Current Password
              </CustomFormLabel>
              <CustomTextField
                placeholder="Enter Current Password"
                id="currentPassword"
                variant="outlined"
                fullWidth
                type="password"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.currentPassword &&
                  Boolean(formik.errors.currentPassword)
                }
                helperText={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                }
              />
              {/* 2 */}
              <CustomFormLabel htmlFor="newPassword">
                New Password
              </CustomFormLabel>
              <CustomTextField
                id="newPassword"
                placeholder="Enter New Password"
                variant="outlined"
                fullWidth
                type="password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
              />
              {/* 3 */}
              <CustomFormLabel htmlFor="confirmPassword">
                Confirm Password
              </CustomFormLabel>
              <CustomTextField
                id="confirmPassword"
                placeholder="Enter Confirm Password"
                variant="outlined"
                fullWidth
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
              <Stack
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                marginTop={2}
              >
                <Button
                  disabled={isChangePasswordLoading}
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
                <Button
                  onClick={() => formik.resetForm()}
                  size="large"
                  variant="text"
                  color="error"
                >
                  Reset
                </Button>
              </Stack>
            </form>
          </CardContent>
        </BlankCard>
      </Grid>
      {/* Edit Details */}
      
      {/* <OtpModal
        isOpen={isShowOtpModal}
        onClose={() => setIsShowOtpModal(false)}
        title={`Verify ${
          pendingUpdateType == "Email" ? "Email Address" : "Phone number"
        }`}
        description={`Enter the 6-digit OTP sent to your ${
          pendingUpdateType == "Email" ? "Email Address" : "Phone number"
        }`}
        otpType={pendingUpdateType == "Email" ? "EMAIL" : "SMS"}
        emailAddress={formData.emailAddress}
        // phoneCountryCode={countryCode}
        phoneNumber={formData.phone}
      /> */}
    </Grid>
  );
};

export default AccountTab;
