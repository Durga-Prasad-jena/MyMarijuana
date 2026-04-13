"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Chip,
  MenuItem,
} from "@mui/material";
import { Formik, Form, FormikErrors } from "formik";
import notify from "@/utils/toast";
import { useLanguagesDataQuery } from "@/store/endpoints/app/languages/languageApi";
import { useAllSubscriptionsQuery } from "@/store/endpoints/app/subscriptions/subscriptionsApi";
import { doctorCreateSchema } from "@/schema/app/doctorSchema";
import { useCreateDoctorMutation } from "@/store/endpoints/doctor/doctorApi";
import { ApiErrorResponse } from "@/types/api_response_model";
import { useRouter } from "next/navigation";
import { useSpecialtiesQuery } from "@/store/endpoints/app/specialities/specialitiesApi";
import CustomFormLabel from "@/theme-components/forms/CustomFormLabel";
import MapPicker from "./MapPickerWrapper";

/* ---------------- types ---------------- */
interface Location {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isPrimary: boolean;
  lat?: number;
  lng?: number;
}

interface CreateDoctorPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNo: string;
  specialityIds: string[];
  languageIds: string[];
  subscriptionPlanId: string;
  locations: Location[];
}

const geocodeAddress = async (address: string) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`
    );
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    }
  } catch (error) {
    console.error("Geocoding error:", error);
  }
  return null;
};

const initialValues: CreateDoctorPayload = {
  firstName: "",
  lastName: "",
  email: "",
  phoneCountryCode: "+1",
  phoneNo: "",
  subscriptionPlanId: "",
  specialityIds: [],
  languageIds: [],
  locations: [
    {
      street: "",
      city: "",
      state: "",
      country: "US",
      postalCode: "",
      isPrimary: true,
      lat: 20.2961,
      lng: 85.8245,
    },
  ],
};

export default function CreateDoctorCard() {
  const [formInitialValues, setFormInitialValues] = useState<CreateDoctorPayload>(initialValues);
  const [createDoctor, { isLoading: isCreateDoctorLoading }] =
    useCreateDoctorMutation();
  const { data: specialitiesData } = useSpecialtiesQuery({
    page: 1,
    limit: 100,
  });
  const { data: languageData } = useLanguagesDataQuery({ page: 1, limit: 100 });
  const { data: subscriptionsData } = useAllSubscriptionsQuery();
  console.log('subscriptionsData', subscriptionsData)

  const router = useRouter();

  /* Set default subscription plan to Regular */
  useEffect(() => {
    if (subscriptionsData?.data && subscriptionsData.data.length > 0) {
      const regularPlan = subscriptionsData.data.find(
        (plan) => plan.name.toLowerCase() === "regular"
      );
      if (regularPlan) {
        setFormInitialValues((prev) => ({
          ...prev,
          subscriptionPlanId: regularPlan.id,
        }));
      }
    }
  }, [subscriptionsData]);

  /* submit function */
  const handleSubmit = async (values: CreateDoctorPayload): Promise<void> => {
    try {
      const payload: CreateDoctorPayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneCountryCode: values.phoneCountryCode,
        phoneNo: values.phoneNo,
        specialityIds: values.specialityIds || [],
        languageIds: values.languageIds || [],
        locations:values.locations.map((item) => ({
                   street: item.street,
                   city: item.city,
                   state: item.state,
                   country: item.country,
                   postalCode: item.postalCode,
                   isPrimary: item.isPrimary,
                   latitude: item.lat,
                   longitude: item.lng,
            })) || [],
        subscriptionPlanId: values.subscriptionPlanId,
      };
      const res = await createDoctor(payload).unwrap();
      notify(res.message, "success");
      router.push(
        `/dashboards/doctor/update-profile?doctorId=${res?.doctorId}`,
      );
    } catch (error) {
      notify((error as ApiErrorResponse)?.data?.message, "error");
    }
  };

  return (
    <Card sx={{ maxWidth: 1000, m: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h5" mb={3}>
          Create Doctor
        </Typography>

        <Formik
          initialValues={formInitialValues}
          validationSchema={doctorCreateSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, handleChange, setFieldValue, errors, touched }) => (
            <Form>
              <Grid container spacing={3}>
                {/* first name */}
                <Grid item xs={6}>
                  <CustomFormLabel>First Name</CustomFormLabel>
                  <TextField
                    name="firstName"
                    placeholder="Enter First Name"
                    // label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>

                {/* last anme  */}
                <Grid item xs={6}>
                  <CustomFormLabel>Last Name</CustomFormLabel>
                  <TextField
                    placeholder="Enter Last Name"
                    name="lastName"
                    // label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>

                {/* email */}
                <Grid item xs={6}>
                  <CustomFormLabel>Email</CustomFormLabel>
                  <TextField
                    name="email"
                    // label="Email"
                    placeholder="Enter Email"
                    value={values.email}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                {/* counrty code  */}
                <Grid item xs={2}>
                  <CustomFormLabel>Country Code</CustomFormLabel>
                  <TextField
                    select
                    // label="Country Code"
                    placeholder="Enter Country Code"
                    name="phoneCountryCode"
                    value={values.phoneCountryCode}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(
                      touched.phoneCountryCode && errors.phoneCountryCode,
                    )}
                    helperText={
                      touched.phoneCountryCode && errors.phoneCountryCode
                    }
                  >
                    <MenuItem value="+1">+1 </MenuItem>
                  </TextField>
                </Grid>

                {/* phone  */}
                <Grid item xs={4}>
                  <CustomFormLabel>Phone Number</CustomFormLabel>
                  <TextField
                    name="phoneNo"
                    // label="Phone Number"
                    placeholder="Enter Phone Number"
                    value={values.phoneNo}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.phoneNo && errors.phoneNo)}
                    helperText={touched.phoneNo && errors.phoneNo}
                  />
                </Grid>

                {/* multi sleect specialty */}
                <Grid item xs={6}>
                  <Autocomplete
                    multiple
                    options={specialitiesData?.data || []}
                    getOptionLabel={(option) => option.name}
                    value={
                      specialitiesData?.data?.filter((s) =>
                        values.specialityIds.includes(String(s.id)),
                      ) || []
                    }
                    onChange={(_, selected) =>
                      setFieldValue(
                        "specialityIds",
                        selected.map((s) => String(s.id)),
                      )
                    }
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip label={option.name} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Specialities"
                        error={
                          touched.specialityIds && Boolean(errors.specialityIds)
                        }
                        helperText={
                          touched.specialityIds && errors.specialityIds
                        }
                      />
                    )}
                  />
                </Grid>

                {/* multi select language */}
                <Grid item xs={6}>
                  <Autocomplete
                    multiple
                    options={languageData?.data || []}
                    getOptionLabel={(option) => option.name}
                    value={
                      languageData?.data?.filter((l) =>
                        values.languageIds.includes(String(l.languageId)),
                      ) || []
                    }
                    onChange={(_, selected) =>
                      setFieldValue(
                        "languageIds",
                        selected.map((l) => String(l.languageId)),
                      )
                    }
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip label={option.name} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Languages"
                        error={
                          touched.languageIds && Boolean(errors.languageIds)
                        }
                        helperText={touched.languageIds && errors.languageIds}
                      />
                    )}
                  />
                </Grid>

                {/* subscription plan */}
                <Grid item xs={6}>
                  <CustomFormLabel>Subscription Plan</CustomFormLabel>

                  <TextField
                    select
                    name="subscriptionPlanId"
                    value={values.subscriptionPlanId || ""}
                    onChange={handleChange}
                    fullWidth
                    error={
                      touched.subscriptionPlanId &&
                      Boolean(errors.subscriptionPlanId)
                    }
                    helperText={
                      touched.subscriptionPlanId && errors.subscriptionPlanId
                    }
                  >
                    <MenuItem value="" disabled>
                      Select Subscription Plan
                    </MenuItem>
                    {subscriptionsData?.data?.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* locations */}
                <Grid item xs={12}>
                  <Typography variant="h6">Location</Typography>
                </Grid>

                {values.locations.map((loc, index) => {
                  const locationError = (errors.locations?.[index] ||
                    {}) as FormikErrors<Location>;
                  const locationTouched = (touched.locations?.[index] ||
                    {}) as Partial<Record<keyof Location, boolean>>;

                  return (
                    <React.Fragment key={index}>
                      <Grid item xs={6}>
                        <CustomFormLabel>Street</CustomFormLabel>
                        <TextField
                          name={`locations.${index}.street`}
                          // label="Street"
                          placeholder="Enter Street"
                          value={loc.street}
                          onChange={handleChange}
                          onBlur={(e) => {
                            handleChange(e);
                            const updatedLoc = { ...loc, street: e.target.value };
                            const address = `${updatedLoc.street}, ${updatedLoc.city}, ${updatedLoc.state} ${updatedLoc.postalCode}, ${updatedLoc.country}`;
                            geocodeAddress(address).then((coords) => {
                              if (coords) {
                                setFieldValue(`locations.${index}.lat`, coords.lat);
                                setFieldValue(`locations.${index}.lng`, coords.lng);
                              }
                            });
                          }}
                          fullWidth
                          error={Boolean(
                            locationTouched.street && locationError.street,
                          )}
                          helperText={
                            locationTouched.street && locationError.street
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomFormLabel>City</CustomFormLabel>
                        <TextField
                          name={`locations.${index}.city`}
                          // label="City"
                          placeholder="Enter City"
                          value={loc.city}
                          onChange={handleChange}
                          onBlur={(e) => {
                            handleChange(e);
                            const updatedLoc = { ...loc, city: e.target.value };
                            const address = `${updatedLoc.street}, ${updatedLoc.city}, ${updatedLoc.state} ${updatedLoc.postalCode}, ${updatedLoc.country}`;
                            geocodeAddress(address).then((coords) => {
                              if (coords) {
                                setFieldValue(`locations.${index}.lat`, coords.lat);
                                setFieldValue(`locations.${index}.lng`, coords.lng);
                              }
                            });
                          }}
                          fullWidth
                          error={Boolean(
                            locationTouched.city && locationError.city,
                          )}
                          helperText={
                            locationTouched.city && locationError.city
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomFormLabel>State</CustomFormLabel>
                        <TextField
                          name={`locations.${index}.state`}
                          // label="State"
                          placeholder="Enter State"
                          value={loc.state}
                          onChange={handleChange}
                          onBlur={(e) => {
                            handleChange(e);
                            const updatedLoc = { ...loc, state: e.target.value };
                            const address = `${updatedLoc.street}, ${updatedLoc.city}, ${updatedLoc.state} ${updatedLoc.postalCode}, ${updatedLoc.country}`;
                            geocodeAddress(address).then((coords) => {
                              if (coords) {
                                setFieldValue(`locations.${index}.lat`, coords.lat);
                                setFieldValue(`locations.${index}.lng`, coords.lng);
                              }
                            });
                          }}
                          fullWidth
                          error={Boolean(
                            locationTouched.state && locationError.state,
                          )}
                          helperText={
                            locationTouched.state && locationError.state
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomFormLabel>Postal Code</CustomFormLabel>
                        <TextField
                          name={`locations.${index}.postalCode`}
                          // label="Postal Code"
                          placeholder="Enter Postal Code"
                          value={loc.postalCode}
                          onChange={handleChange}
                          onBlur={(e) => {
                            handleChange(e);
                            const updatedLoc = { ...loc, postalCode: e.target.value };
                            const address = `${updatedLoc.street}, ${updatedLoc.city}, ${updatedLoc.state} ${updatedLoc.postalCode}, ${updatedLoc.country}`;
                            geocodeAddress(address).then((coords) => {
                              if (coords) {
                                setFieldValue(`locations.${index}.lat`, coords.lat);
                                setFieldValue(`locations.${index}.lng`, coords.lng);
                              }
                            });
                          }}
                          fullWidth
                          error={Boolean(
                            locationTouched.postalCode &&
                            locationError.postalCode,
                          )}
                          helperText={
                            locationTouched.postalCode &&
                            locationError.postalCode
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomFormLabel>Country</CustomFormLabel>
                        <TextField
                          select
                          name={`locations.${index}.country`}
                          // label="Country"
                          placeholder="Select Country"
                          value={loc.country}
                          onChange={(e) => {
                            handleChange(e);
                            const updatedLoc = { ...loc, country: e.target.value };
                            const address = `${updatedLoc.street}, ${updatedLoc.city}, ${updatedLoc.state} ${updatedLoc.postalCode}, ${updatedLoc.country}`;
                            geocodeAddress(address).then((coords) => {
                              if (coords) {
                                setFieldValue(`locations.${index}.lat`, coords.lat);
                                setFieldValue(`locations.${index}.lng`, coords.lng);
                              }
                            });
                          }}
                          fullWidth
                          error={Boolean(
                            locationTouched.country && locationError.country,
                          )}
                          helperText={
                            locationTouched.country && locationError.country
                          }
                        >
                          <MenuItem value="US">United States</MenuItem>
                          <MenuItem value="india">India</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={`locations.${index}.isPrimary`}
                              checked={loc.isPrimary}
                              onChange={(e) =>
                                setFieldValue(
                                  `locations.${index}.isPrimary`,
                                  e.target.checked,
                                )
                              }
                            />
                          }
                          label="Primary Location"
                        />
                      </Grid>
                      <MapPicker
                        location={loc}
                        onChange={(newLoc: any) =>
                          setFieldValue(`locations.${index}`, { ...loc, ...newLoc })
                        }
                      />
                    </React.Fragment>
                  );
                })}

                {/* submit */}
                <Grid item xs={12}>
                  <Button
                    disabled={isCreateDoctorLoading}
                    type="submit"
                    variant="contained"
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
