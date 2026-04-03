"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Card,
  CardContent,
  Box,
  Stack,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import { Add, Delete } from "@mui/icons-material";
import {
  useDoctorDetailByIdQuery,
  useRemoveMultipleImageMutation,
  useUpdateProfileMutation,
} from "@/store/endpoints/doctor/doctorApi";
import notify from "@/utils/toast";
import { ApiErrorResponse } from "@/types/api_response_model";
import {
  Medum,
  Qualification,
  UpdateDoctorProfilePayload,
} from "@/types/apps/doctor";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import CustomFormLabel from "@/theme-components/forms/CustomFormLabel";

/* ---------------- validation schema ---------------- */
const validationSchema = Yup.object({
  sessionPrice: Yup.number()
    .typeError("Session Price must be a number") // ensures only numbers
    .required("Session Price is required")
    .min(0, "Session Price cannot be negative"),

  experienceYears: Yup.number()
    .typeError("Experience must be a number") // ensures only numbers
    .required("Experience is required")
    .min(0, "Experience cannot be negative"),
  professionalTitle: Yup.string().required("Professional Title is required"),
  websiteUrl: Yup.string().url("Enter a valid URL").nullable(),

  licenseNumber: Yup.string().required("License Number is required"),
  licenseType: Yup.string().required("License Type is required"),
  licenseState: Yup.string().required("License State is required"),
  licenseVerified: Yup.boolean(),

  qualifications: Yup.array()
    .of(
      Yup.object({
        degree: Yup.string().required("Degree is required"),
        institution: Yup.string().required("Institution is required"),
        yearCompleted: Yup.number()
          .typeError("Year Completed  must be a number")
          .required("Year is required")
          .min(1900, "Year must be valid")
          .max(new Date().getFullYear(), "Year cannot be in the future"),
        // credentialType: Yup.string().required("Credential is required"),
      }),
    )
    .min(1, "At least one qualification is required"),
});

export default function ProfessionalForm({ doctorId }: { doctorId: string }) {
  const [preview, setPreview] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [multiImages, setMultiImages] = useState<{ file: File; url: string }[]>(
    [],
  );
  console.log("multiImages", multiImages);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [doctorMedia, setDoctorMedia] = useState<Medum[]>([]);

  const isNoUserImage = (url?: string | null) =>
    !url || url.toLowerCase().includes("no_user_image");

  const router = useRouter();

  const { data: doctorDetail, refetch } = useDoctorDetailByIdQuery(
    { id: doctorId },
    { skip: !doctorId },
  );

  const [removeMultipleImage, { isLoading: isRemoveImageLoading }] =
    useRemoveMultipleImageMutation();
  console.log("doctorDetail", doctorDetail);

  const initialValues = React.useMemo(
    () => ({
      sessionPrice: doctorDetail?.sessionPrice || "",
      professionalTitle: doctorDetail?.professionalTitle || "",
      experienceYears: doctorDetail?.experienceYears || "",
      licenseNumber: doctorDetail?.licenseNumber || "",
      licenseType: doctorDetail?.licenseType || "",
      licenseState: doctorDetail?.licenseState || "",
      licenseVerified: doctorDetail?.licenseVerified || false,
      acceptingNewClients: doctorDetail?.acceptingInPersonClients || false,
      websiteUrl: doctorDetail?.websiteUrl || "",

      qualifications: doctorDetail?.qualifications?.length
        ? doctorDetail.qualifications.map((q: Qualification) => ({
            degree: q.degree || "",
            institution: q.institution || "",
            yearCompleted: q.yearCompleted || "",
            // credentialType: q.credentialType || "",
          }))
        : [
            {
              degree: "",
              institution: "",
              yearCompleted: "",
              credentialType: "",
            },
          ],
    }),
    [doctorDetail],
  );

  useEffect(() => {
    if (doctorDetail) {
      const avatar = doctorDetail.avatar;
      if (avatar && !isNoUserImage(avatar)) {
        setPreviewUrl(avatar);
      } else {
        setPreviewUrl("");
      }
    }
  }, [doctorDetail]);

  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    setDoctorMedia(
      doctorDetail?.media
        ? doctorDetail.media.filter((m) => !isNoUserImage(m.url))
        : [],
    );
  }, [doctorDetail]);

  // Generate preview URL and cleanup
  useEffect(() => {
    if (!preview) return;
    const url = URL.createObjectURL(preview);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [preview]);

  /* ---------------- HANDLERS ---------------- */
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(file);
  };

  const handleUploadMultipleImages = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isNew: true,
    }));

    setMultiImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    setMultiImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateProfile = async (v: typeof initialValues) => {
    try {
      setIsUpdateLoading(true);

      const payload: UpdateDoctorProfilePayload = {
        sessionPrice: Number(v.sessionPrice),
        professionalTitle: v.professionalTitle,
        experienceYears: Number(v.experienceYears) || 0,
        licenseNumber: v.licenseNumber,
        licenseType: v.licenseType,
        licenseState: v.licenseState,
        licenseVerified: v.licenseVerified,
        verifiedBy: "Marijuana Doctor",
        acceptingNewClients: v.acceptingNewClients,
        websiteUrl: v.websiteUrl,
        generateAvatarUploadUrl: !!preview,
        generateMediaUploadUrls: multiImages.length > 0,

        mediaType: "image",
        mediaContentType: "image/jpeg",
        qualifications: v.qualifications.map((q, index) => ({
          degree: q.degree,
          institution: q.institution,
          yearCompleted: Number(q.yearCompleted) || 0,
          // credentialType: q.credentialType,
          displayOrder: index + 1,
        })),
      };

      if (multiImages.length > 0) {
        payload.mediaCount = multiImages.length;
      }

      const res = await updateProfile({ id: doctorId, body: payload }).unwrap();

      // avatar upload
      if (preview && res.avatarUploadUrl) {
        await fetch(res.avatarUploadUrl, {
          method: "PUT",
          body: preview,
          headers: { "Content-Type": preview.type },
        });
      }

      // multiple upload
      if (multiImages.length && res.mediaUploadUrls?.length) {
        await Promise.all(
          res.mediaUploadUrls.map((item: any, index: number) => {
            const file = multiImages[index]?.file;
            if (!file) return;

            return fetch(item.uploadUrl, {
              method: "PUT",
              body: file,
              headers: { "Content-Type": file.type },
            });
          }),
        );
      }

      // important fix
      await new Promise((r) => setTimeout(r, 1000));
      await refetch();

      setMultiImages([]);
      setDoctorMedia([]);

      notify(res?.message, "success");
      // notify("Profile updated successfully", "success");
      router.push("/dashboards/doctor");
    } catch (error) {
      notify((error as ApiErrorResponse)?.data?.message, "error");
    } finally {
      setIsUpdateLoading(false);
    }
  };

  //delete image function
  const handleDeleteImage = async (mediaId: string) => {
    try {
      const res = await removeMultipleImage({ id: doctorId, mediaId }).unwrap();
      notify(res?.message, "success");
    } catch (error) {
      notify((error as ApiErrorResponse)?.data?.message, "error");
    }
  };
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleUpdateProfile}
        enableReinitialize
        validationSchema={validationSchema}
      >
        {({ values, handleChange, setFieldValue, errors, touched }) => (
          <Form>
            <Grid container spacing={3}>
              {/* Profile & Gallery */}
              <Grid item xs={12} md={9} lg={12}>
                <Stack spacing={4}>
                  <Card sx={{ p: 3 }}>
                    <CardContent>
                      <Typography variant="h6" mb={2} textAlign="center">
                        Profile Image
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        textAlign="center"
                      >
                        {(doctorDetail?.avatar && !doctorDetail.avatar.includes("no_user_image")) ? (
                          <Avatar
                            src={doctorDetail.avatar}
                            alt="Profile"
                            sx={{ width: 120, height: 120, mb: 2 }}
                          />
                        ) : previewUrl ? (
                          <Avatar
                            src={previewUrl}
                            alt="Profile"
                            sx={{ width: 120, height: 120, mb: 2 }}
                          />
                        ) : (
                          <Avatar
                            sx={{ width: 120, height: 120, mb: 2 }}
                          // transparent fallback if no image
                          src=""
                          alt="Profile"
                        />
                        )}

                        <Button
                          variant="contained"
                          color="primary"
                          component="label"
                        >
                          Upload Profile Image
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={handleUploadImage}
                          />
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card sx={{ p: 3 }}>
                    <CardContent>
                      <Typography variant="h6" mb={2}>
                        Gallery Images
                      </Typography>
                      <Grid container spacing={2}>
                        {doctorMedia
                          .filter((img) => !isNoUserImage(img.url))
                          .map((img, index) => (
                          <Grid
                            item
                            xs={6}
                            sm={4}
                            md={3}
                            key={index}
                            position="relative"
                          >
                            <Avatar
                              src={img.url}
                              variant="rounded"
                              sx={{
                                width: "100%",
                                height: 150,
                                objectFit: "contain",
                              }}
                            />

                            <Tooltip title="Remove">
                              <IconButton
                                size="small"
                                color="error"
                                sx={{
                                  position: "absolute",
                                  top: 14,
                                  right: 4,
                                }}
                                // disabled={isRemoveImageLoading}
                                onClick={() => handleDeleteImage(img.mediaId)}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        ))}
                        {multiImages
                          .filter((img) => !isNoUserImage(img.url))
                          .map((img, index) => (
                            <Grid
                              item
                              xs={6}
                              sm={4}
                              md={3}
                              key={index}
                              position="relative"
                            >
                              <Avatar
                                src={img.url}
                                variant="rounded"
                                sx={{
                                  width: "100%",
                                  height: 150,
                                  objectFit: "contain",
                                }}
                              />
                              <Tooltip title="Remove">
                                <IconButton
                                  size="small"
                                  color="error"
                                  sx={{
                                    position: "absolute",
                                    top: 14,
                                    right: 4,
                                  }}
                                  onClick={() => handleRemoveImage(index)}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          ))}
                      </Grid>
                      <Box display="flex" justifyContent="center" mt={2}>
                        <Button variant="outlined" component="label">
                          Upload Multiple Images
                          <input
                            hidden
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleUploadMultipleImages}
                          />
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>

              {/* Professional Info */}
              <Grid item xs={12} md={9} lg={12}>
                <Stack spacing={3}>
                  <Card sx={{ padding: 3 }}>
                    <CardContent>
                      <Typography variant="h6" mb={2}>
                        Professional Info
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <CustomFormLabel>Session Price</CustomFormLabel>
                          <TextField
                            // label="Session Price"
                            placeholder="Enter Session Price"
                            name="sessionPrice"
                            fullWidth
                            value={values.sessionPrice}
                            onChange={handleChange}
                            error={Boolean(
                              errors.sessionPrice && touched.sessionPrice,
                            )}
                            helperText={
                              touched.sessionPrice && errors.sessionPrice
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <CustomFormLabel>Professional Title</CustomFormLabel>
                          <TextField
                            // label="Professional Title"
                            name="professionalTitle"
                            placeholder="Licensed Professional Clinical Counselor , LPCC, ATR-BC,MFA,RYT-200,CTHP"
                            fullWidth
                            value={values.professionalTitle}
                            onChange={handleChange}
                            error={Boolean(
                              errors.professionalTitle &&
                              touched.professionalTitle,
                            )}
                            helperText={
                              touched.professionalTitle &&
                              errors.professionalTitle
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <CustomFormLabel>Experience (Years)</CustomFormLabel>
                          <TextField
                            // label="Experience (Years)"
                            placeholder="Enter Experience year"
                            name="experienceYears"
                            fullWidth
                            value={values.experienceYears}
                            onChange={handleChange}
                            error={Boolean(
                              errors.experienceYears && touched.experienceYears,
                            )}
                            helperText={
                              touched.experienceYears && errors.experienceYears
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <CustomFormLabel>Website</CustomFormLabel>
                          <TextField
                            // label="Website"
                            placeholder="Enter Website"
                            name="websiteUrl"
                            fullWidth
                            value={values.websiteUrl}
                            onChange={handleChange}
                            error={Boolean(
                              errors.websiteUrl && touched.websiteUrl,
                            )}
                            helperText={touched.websiteUrl && errors.websiteUrl}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.acceptingNewClients}
                                onChange={(e) =>
                                  setFieldValue(
                                    "acceptingNewClients",
                                    e.target.checked,
                                  )
                                }
                              />
                            }
                            label="Accepting Online Clients"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  {/* License Card */}
                  <Card>
                    <CardContent>
                      <Typography variant="h6" mb={2}>
                        License Details
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <CustomFormLabel>License Number</CustomFormLabel>
                          <TextField
                            // label="License Number"
                            placeholder="Enter License Number"
                            name="licenseNumber"
                            fullWidth
                            value={values.licenseNumber}
                            onChange={handleChange}
                            error={Boolean(
                              errors.licenseNumber && touched.licenseNumber,
                            )}
                            helperText={
                              touched.licenseNumber && errors.licenseNumber
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <CustomFormLabel>License Type</CustomFormLabel>
                          <TextField
                            // label="License Type"
                            placeholder="Enter License Type"
                            name="licenseType"
                            fullWidth
                            value={values.licenseType}
                            onChange={handleChange}
                            error={Boolean(
                              errors.licenseType && touched.licenseType,
                            )}
                            helperText={
                              touched.licenseType && errors.licenseType
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <CustomFormLabel>License State</CustomFormLabel>
                          <TextField
                            // label="License State"
                            placeholder="Enter License State"
                            name="licenseState"
                            fullWidth
                            value={values.licenseState}
                            onChange={handleChange}
                            error={Boolean(
                              errors.licenseState && touched.licenseState,
                            )}
                            helperText={
                              touched.licenseState && errors.licenseState
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.licenseVerified}
                                onChange={(e) =>
                                  setFieldValue(
                                    "licenseVerified",
                                    e.target.checked,
                                  )
                                }
                              />
                            }
                            label="License Verified"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  {/* Qualifications Card */}
                  {/* -------- Qualifications Card -------- */}
                  <Card>
                    <CardContent>
                      <Typography variant="h6" mb={2}>
                        Qualifications
                      </Typography>

                      <FieldArray name="qualifications">
                        {({ push, remove }) => (
                          <Stack spacing={2}>
                            {values.qualifications.map((q, i) => {
                              // Type-safe errors for each qualification
                              const qualError = (errors.qualifications?.[i] ||
                                {}) as {
                                degree?: string;
                                institution?: string;
                                yearCompleted?: string;
                                // credentialType?: string;
                              };

                              return (
                                <Box
                                  key={i}
                                  sx={{
                                    p: 2,
                                    border: "1px solid #eee",
                                    borderRadius: 2,
                                  }}
                                >
                                  <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                  >
                                    <Grid item xs={12} md={3}>
                                      <CustomFormLabel>Degree</CustomFormLabel>
                                      <TextField
                                        // label="Degree"
                                        placeholder="Enter Degree"
                                        name={`qualifications.${i}.degree`}
                                        fullWidth
                                        value={q.degree}
                                        onChange={handleChange}
                                        error={Boolean(
                                          touched.qualifications?.[i]?.degree &&
                                          qualError.degree,
                                        )}
                                        helperText={
                                          touched.qualifications?.[i]?.degree &&
                                          qualError.degree
                                        }
                                      />
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                      <CustomFormLabel>
                                        Institution
                                      </CustomFormLabel>
                                      <TextField
                                        // label="Institution"
                                        placeholder="Enter Institution"
                                        name={`qualifications.${i}.institution`}
                                        fullWidth
                                        value={q.institution}
                                        onChange={handleChange}
                                        error={Boolean(
                                          touched.qualifications?.[i]
                                            ?.institution &&
                                          qualError.institution,
                                        )}
                                        helperText={
                                          touched.qualifications?.[i]
                                            ?.institution &&
                                          qualError.institution
                                        }
                                      />
                                    </Grid>

                                    <Grid item xs={12} md={2}>
                                      <CustomFormLabel>Year</CustomFormLabel>
                                      <TextField
                                        // label="Year"
                                        placeholder="Enter Year"
                                        name={`qualifications.${i}.yearCompleted`}
                                        fullWidth
                                        value={q.yearCompleted}
                                        onChange={handleChange}
                                        error={Boolean(
                                          touched.qualifications?.[i]
                                            ?.yearCompleted &&
                                          qualError.yearCompleted,
                                        )}
                                        helperText={
                                          touched.qualifications?.[i]
                                            ?.yearCompleted &&
                                          qualError.yearCompleted
                                        }
                                      />
                                    </Grid>


                                    <Grid item xs={12} md={2}>
                                      <IconButton
                                        color="error"
                                        onClick={() => remove(i)}
                                        disabled={
                                          values.qualifications.length === 1
                                        }
                                      >
                                        <Delete />
                                      </IconButton>
                                    </Grid>
                                  </Grid>
                                </Box>
                              );
                            })}

                            {/* Add Button */}
                            <IconButton
                              color="primary"
                              onClick={() =>
                                push({
                                  degree: "",
                                  institution: "",
                                  yearCompleted: "",
                                  // credentialType: "",
                                })
                              }
                            >
                              <Add />
                            </IconButton>
                          </Stack>
                        )}
                      </FieldArray>
                    </CardContent>
                  </Card>

                  <Button
                    disabled={isUpdateLoading}
                    type="submit"
                    variant="contained"
                    size="large"
                  >
                    {isUpdateLoading ? "Updating..." : "Update"}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
