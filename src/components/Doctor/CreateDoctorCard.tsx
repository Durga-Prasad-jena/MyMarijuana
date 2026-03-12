"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useCreateDoctorMutation } from "@/store/endpoints/doctor/doctorApi";
import { useInsuranceDataQuery } from "@/store/endpoints/app/insurances/insuranceApi";
import { useTherapiesQuery } from "@/store/endpoints/app/therapies/therapiesApi";
import { useLanguagesDataQuery } from "@/store/endpoints/app/languages/languageApi";
import { useSpecialitiesQuery } from "@/store/endpoints/app/specialities/specialitiesApi";
import {
  createDoctorInitialValues,
  CreateDoctorPayload,
  doctorClientFocusTypes,
  doctorQualificationCredentialTypes,
  licenseTypes,
} from "@/types/apps/doctor";
import notify from "@/utils/toast";
import { ApiErrorResponse } from "@/types/api_response_model";
import { createDoctorValidationSchema } from "@/schema/app/doctorSchema";
import { useRouter } from "next/navigation";

/* ------------------ COMPONENT ------------------ */
export default function CreateDoctorCard() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  console.log("fileToUpload", fileToUpload);

  const router = useRouter();

  const { data: insuranceData } = useInsuranceDataQuery();
  const { data: therapiesData } = useTherapiesQuery();
  const { data: specialitiesData } = useSpecialitiesQuery();
  const { data: languageData } = useLanguagesDataQuery();

  const [createDoctor, { isLoading: isCreateDoctorLoading }] =
    useCreateDoctorMutation();

  const handleSubmit = async (values: any) => {
    try {
      const profile = values.doctorProfile;

      const payload: CreateDoctorPayload = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
        phoneCountryCode: values.phoneCountryCode.trim(),
        phoneNo: values.phoneNo.trim(),

        professionalTitle: profile.professionalTitle.trim(),
        bio: profile.bio.trim(),
        experienceYears: Number(profile.experienceYears),

        licenseType: values.licenseType,
        websiteUrl: profile.websiteUrl.trim(),
        licenseNumber: profile.licenseNumber.trim(),
        licenseState: profile.licenseState.trim(),

        licenseVerified: true,
        acceptingNewClients: profile.acceptingNewClients,

        emailForPatients: profile.emailForPatients.trim(),
        phoneForPatients: profile.phoneForPatients.trim(),

        clientFocus: profile.clientFocus,

        specialityIds: profile.specialityId ? [profile.specialityId] : [],
        therapyIds: profile.therapyId ? [profile.therapyId] : [],
        languageIds: profile.languageId ? [profile.languageId] : [],
        insuranceIds: profile.insuranceId ? [profile.insuranceId] : [],

        qualifications: profile.qualifications.map((q: any, index: number) => ({
          degree: q.degree.trim(),
          institution: q.institution.trim(),
          yearCompleted: Number(q.yearCompleted),
          credentialType: q.credentialType.trim(),
          displayOrder: index + 1,
        })),

        locations: profile.locations.map((loc: any) => ({
          clinicName: loc.clinicName,
          street: loc.street,
          city: loc.city,
          state: loc.state,
          country: loc.country,
          postalCode: loc.postalCode,
          latitude: Number(loc.latitude),
          longitude: Number(loc.longitude),
          isPrimary: loc.isPrimary,
          phone: profile.phoneForPatients,
          email: profile.emailForPatients,
        })),
      };
      console.log("payload", payload);
      const result = await createDoctor(payload).unwrap();
      const uploadURL = result.avatarUploadUrl;

      if (!fileToUpload) return;

      const res = await fetch(uploadURL, {
        method: "PUT",
        body: fileToUpload,
        headers: {
          "Content-Type": fileToUpload.type,
        },
      });

      if (res.ok) {
        router.push("/dashboards/doctor");
      }
    } catch (err) {
      notify((err as ApiErrorResponse).data.message, "error");
    }
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileToUpload(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <Card sx={{ maxWidth: 1000, margin: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h5" mb={3}>
          Create Doctor
        </Typography>
        <Box textAlign="center" display="flex" justifyContent="center">
          <Box>
            <Avatar
              src={preview ?? "/images/profile/user-1.jpg"}
              alt={"user1"}
              sx={{ width: 120, height: 120, margin: "0 auto" }}
            />
            <Stack direction="row" justifyContent="center" spacing={2} my={3}>
              <Button variant="contained" color="primary" component="label">
                Upload
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleUploadImage}
                />
              </Button>
            </Stack>
          </Box>
        </Box>

        <Formik
          initialValues={createDoctorInitialValues}
          validationSchema={createDoctorValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            setFieldValue,
            touched,
            errors,
            handleBlur,
          }) => (
            <Form autoComplete="off">
              <Grid container spacing={3}>
                {/* BASIC INFO */}
                <Grid item xs={6}>
                  <TextField
                    name="firstName"
                    placeholder="Enter First Name"
                    value={values.firstName}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={values.lastName}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="email"
                    placeholder="Enter Email"
                    value={values.email || ""}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                    value={values.password || ""}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>

                {/* LICENSE TYPE */}
                <Grid item xs={6}>
                  <TextField
                    select
                    label="Select License Type"
                    name="licenseType"
                    value={values.licenseType}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.licenseType && errors.licenseType)}
                    helperText={touched.licenseType && errors.licenseType}
                  >
                    {licenseTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* PHONE */}
                <Grid item xs={3}>
                  <TextField
                    placeholder="Enter Phone Country Code"
                    name="phoneCountryCode"
                    value={values.phoneCountryCode}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.phoneCountryCode && errors.phoneCountryCode,
                    )}
                    helperText={
                      touched.phoneCountryCode && errors.phoneCountryCode
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    placeholder="Enter Phone Number"
                    name="phoneNo"
                    value={values.phoneNo}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.phoneNo && errors.phoneNo)}
                    helperText={touched.phoneNo && errors.phoneNo}
                  />
                </Grid>

                {/* DOCTOR PROFILE */}
                <Grid item xs={6}>
                  <TextField
                    placeholder="Enter Professional Title"
                    name="doctorProfile.professionalTitle"
                    value={values.doctorProfile.professionalTitle}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.doctorProfile?.professionalTitle &&
                      errors.doctorProfile?.professionalTitle,
                    )}
                    helperText={
                      touched.doctorProfile?.professionalTitle &&
                      errors.doctorProfile?.professionalTitle
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    placeholder="Enter Experience Years"
                    name="doctorProfile.experienceYears"
                    type="number"
                    value={values.doctorProfile.experienceYears}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.doctorProfile?.experienceYears &&
                      errors.doctorProfile?.experienceYears,
                    )}
                    helperText={
                      touched.doctorProfile?.experienceYears &&
                      errors.doctorProfile?.experienceYears
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    placeholder="Enter License Number"
                    name="doctorProfile.licenseNumber"
                    value={values.doctorProfile.licenseNumber}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.doctorProfile?.licenseNumber &&
                      errors.doctorProfile?.licenseNumber,
                    )}
                    helperText={
                      touched.doctorProfile?.licenseNumber &&
                      errors.doctorProfile?.licenseNumber
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    placeholder="Enter License State"
                    name="doctorProfile.licenseState"
                    value={values.doctorProfile.licenseState}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.doctorProfile?.licenseState &&
                      errors.doctorProfile?.licenseState,
                    )}
                    helperText={
                      touched.doctorProfile?.licenseState &&
                      errors.doctorProfile?.licenseState
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    placeholder="Enter Bio"
                    name="doctorProfile.bio"
                    value={values.doctorProfile.bio}
                    fullWidth
                    multiline
                    rows={3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.doctorProfile?.bio && errors.doctorProfile?.bio,
                    )}
                    helperText={
                      touched.doctorProfile?.bio && errors.doctorProfile?.bio
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.doctorProfile.acceptingNewClients}
                        onChange={(e) =>
                          setFieldValue(
                            "doctorProfile.acceptingNewClients",
                            e.target.checked,
                          )
                        }
                        onBlur={handleBlur}
                        name="doctorProfile.acceptingNewClients"
                      />
                    }
                    label="Accepting New Clients"
                  />
                </Grid>

                {/* PATIENT CONTACT */}
                <Grid item xs={6}>
                  <TextField
                    placeholder="Enter Email For Patients"
                    name="doctorProfile.emailForPatients"
                    value={values.doctorProfile.emailForPatients}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.doctorProfile?.emailForPatients &&
                      errors.doctorProfile?.emailForPatients,
                    )}
                    helperText={
                      touched.doctorProfile?.emailForPatients &&
                      errors.doctorProfile?.emailForPatients
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    placeholder="Phone For Patients"
                    name="doctorProfile.phoneForPatients"
                    value={values.doctorProfile.phoneForPatients}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.doctorProfile?.phoneForPatients &&
                      errors.doctorProfile?.phoneForPatients,
                    )}
                    helperText={
                      touched.doctorProfile?.phoneForPatients &&
                      errors.doctorProfile?.phoneForPatients
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    placeholder="Enter Website URL"
                    name="doctorProfile.websiteUrl"
                    value={values.doctorProfile.websiteUrl}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.doctorProfile?.websiteUrl &&
                      errors.doctorProfile?.websiteUrl,
                    )}
                    helperText={
                      touched.doctorProfile?.websiteUrl &&
                      errors.doctorProfile?.websiteUrl
                    }
                  />
                </Grid>

                {/* DROPDOWNS FROM API */}
                <Grid item xs={6}>
                  <TextField
                    select
                    label="Select Speciality"
                    name="doctorProfile.specialityId"
                    value={values.doctorProfile.specialityId}
                    fullWidth
                    onChange={handleChange}
                  >
                    {specialitiesData?.data.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    select
                    label="Select Insurance"
                    name="doctorProfile.insuranceId"
                    value={values.doctorProfile.insuranceId}
                    fullWidth
                    onChange={handleChange}
                  >
                    {insuranceData?.data.map((i) => (
                      <MenuItem key={i.id} value={i.id}>
                        {i.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    select
                    label="Select Therapy"
                    name="doctorProfile.therapyId"
                    value={values.doctorProfile.therapyId}
                    fullWidth
                    onChange={handleChange}
                  >
                    {therapiesData?.data.map((t) => (
                      <MenuItem key={t.id} value={t.id}>
                        {t.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    select
                    label="Select Language"
                    name="doctorProfile.languageId"
                    value={values.doctorProfile.languageId}
                    fullWidth
                    onChange={handleChange}
                  >
                    {languageData?.data.map((l) => (
                      <MenuItem key={l.id} value={l.id}>
                        {l.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* CLIENT FOCUS */}
                <Grid item xs={12}>
                  <Typography variant="h6">Client Focus</Typography>
                  {doctorClientFocusTypes.map((item) => {
                    const checked =
                      values.doctorProfile.clientFocus.includes(item);
                    return (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...values.doctorProfile.clientFocus, item]
                                : values.doctorProfile.clientFocus.filter(
                                    (v) => v !== item,
                                  );
                              setFieldValue(
                                "doctorProfile.clientFocus",
                                updated,
                              );
                            }}
                          />
                        }
                        label={item}
                      />
                    );
                  })}
                </Grid>

                {/* QUALIFICATIONS */}
                <Grid item xs={12}>
                  <Typography variant="h6">Qualifications</Typography>
                </Grid>
                <FieldArray name="doctorProfile.qualifications">
                  {({ push }) => (
                    <>
                      {values.doctorProfile.qualifications.map((q, index) => (
                        <React.Fragment key={index}>
                          <Grid item xs={3}>
                            <TextField
                              label="Degree"
                              name={`doctorProfile.qualifications.${index}.degree`}
                              value={q.degree}
                              fullWidth
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              label="Institution"
                              name={`doctorProfile.qualifications.${index}.institution`}
                              value={q.institution}
                              fullWidth
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              label="Year"
                              name={`doctorProfile.qualifications.${index}.yearCompleted`}
                              value={q.yearCompleted}
                              fullWidth
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              select
                              label="Credential Type"
                              name={`doctorProfile.qualifications.${index}.credentialType`}
                              value={q.credentialType}
                              fullWidth
                              onChange={handleChange}
                            >
                              {doctorQualificationCredentialTypes.map(
                                (type) => (
                                  <MenuItem key={type} value={type}>
                                    {type}
                                  </MenuItem>
                                ),
                              )}
                            </TextField>
                          </Grid>
                        </React.Fragment>
                      ))}
                      <Grid item xs={12}>
                        <Button
                          variant="outlined"
                          onClick={() =>
                            push({
                              degree: "",
                              institution: "",
                              yearCompleted: "",
                              credentialType: "",
                            })
                          }
                        >
                          Add Qualification
                        </Button>
                      </Grid>
                    </>
                  )}
                </FieldArray>

                {/* LOCATION */}
                <Grid item xs={12}>
                  <Typography variant="h6">Clinic Location</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Clinic Name"
                    name="doctorProfile.locations.0.clinicName"
                    value={values.doctorProfile.locations[0].clinicName}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Street"
                    name="doctorProfile.locations.0.street"
                    value={values.doctorProfile.locations[0].street}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="City"
                    name="doctorProfile.locations.0.city"
                    value={values.doctorProfile.locations[0].city}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="State"
                    name="doctorProfile.locations.0.state"
                    value={values.doctorProfile.locations[0].state}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Postal Code"
                    name="doctorProfile.locations.0.postalCode"
                    value={values.doctorProfile.locations[0].postalCode}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Country"
                    name="doctorProfile.locations.0.country"
                    value={values.doctorProfile.locations[0].country}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Latitude"
                    name="doctorProfile.locations.0.latitude"
                    value={values.doctorProfile.locations[0].latitude}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Longitude"
                    name="doctorProfile.locations.0.longitude"
                    value={values.doctorProfile.locations[0].longitude}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.doctorProfile.locations[0].isPrimary}
                        name="doctorProfile.locations.0.isPrimary"
                        onChange={handleChange}
                      />
                    }
                    label="Primary Location"
                  />
                </Grid>

                {/* SUBMIT BUTTON */}
                <Grid item xs={12}>
                  <Button
                    disabled={isCreateDoctorLoading}
                    variant="contained"
                    type="submit"
                    size="large"
                  >
                    Create Doctor
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
