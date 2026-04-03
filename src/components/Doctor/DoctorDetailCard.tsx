import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useDoctorDetailByIdQuery } from "@/store/endpoints/doctor/doctorApi";
import constants from "@/utils/constants";

interface DoctorDetailCardProps {
  doctorId: string;
}

const DoctorDetailCard: React.FC<Partial<DoctorDetailCardProps>> = ({
  doctorId,
}) => {
  const { data: doctorDetails, isLoading } = useDoctorDetailByIdQuery(
    { id: doctorId! },
    { skip: !doctorId },
  );

  if (isLoading) {
    return (
      <CircularProgress
        size={constants.CIRCULAR_PROGRESS_SIZE}
        sx={{ display: "block", mx: "auto", my: 5 }}
      />
    );
  }

  if (!doctorDetails) return null;

  return (
    <Grid container spacing={3} p={3}>
      {/* Doctor Basic Info */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Stack direction="row" spacing={3} alignItems="center">
              <Avatar
                src={doctorDetails.avatar}
                sx={{ width: 80, height: 80 }}
              />
              <div>
                <Typography variant="h5" fontWeight="bold">
                  {doctorDetails.title} {doctorDetails.firstName}{" "}
                  {doctorDetails.lastName}
                </Typography>
                <Stack direction="row" spacing={1} mt={1}>
                  {/* <Chip
                    label={doctorDetails. ? "Active" : "Inactive"}
                    color={doctorDetails. ? "success" : "default"}
                  /> */}
                  <Chip
                    label={
                      doctorDetails.isEmailVerified
                        ? "Email Verified"
                        : "Email Not Verified"
                    }
                    color={
                      doctorDetails.isEmailVerified ? "success" : "warning"
                    }
                  />
                </Stack>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Contact Info */}
      <Grid item xs={12} md={6}>
        <Card sx={{ minHeight: 220, display: "flex", flexDirection: "column" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>Email: {doctorDetails.email}</Typography>
            <Typography>
              Phone: {doctorDetails.phoneCountryCode} {doctorDetails.phoneNo}
            </Typography>
            {doctorDetails.email && (
              <Typography>
                Patient Email: {doctorDetails.email}
              </Typography>
            )}
            {doctorDetails.phoneNo && (
              <Typography>
                Patient Phone: {doctorDetails.phoneNo}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Specialties & Languages */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Specialties</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
              {doctorDetails.specialties?.map((s, i) => (
                <Chip key={i} label={s} color="primary" />
              ))}
            </Stack>

            <Typography variant="h6" mt={3}>
              Languages
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
              {doctorDetails.languages?.map((l, i) => (
                <Chip key={i} label={l} />
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Locations */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Locations</Typography>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={2}>
              {doctorDetails.locations?.map((loc, i) => (
                <Card key={i} variant="outlined" sx={{ p: 2 }}>
                  <Typography>
                    {loc.street}, {loc.city}, {loc.state}, {loc.country} -{" "}
                    {loc.postalCode}
                  </Typography>
                  {loc.isPrimary && (
                    <Chip label="Primary" size="small" color="success" />
                  )}
                </Card>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DoctorDetailCard;
