import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Stack,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import { useDoctorDetailByIdQuery } from "@/store/endpoints/doctor/doctorApi";
import Link from "next/link";
import { NameCard } from "../NameCard";

interface DoctorDetailCardProps {
  doctorId?: string;
}

const DoctorDetailCard: React.FC<DoctorDetailCardProps> = ({ doctorId }) => {
  const { data: doctor, isLoading } = useDoctorDetailByIdQuery(
    { id: doctorId! },
    { skip: !doctorId },
  );

  if (isLoading)
    return (
      <CircularProgress
        size={20}
        sx={{ display: "block", mx: "auto", my: 5 }}
      />
    );

  if (!doctor) return null;

  return (
    <Box p={3}>
      {/* HEADER */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={doctor.avatar} sx={{ width: 80, height: 80 }} />

          <Box flex={1}>
            <Typography variant="h5" fontWeight="bold">
              {doctor.title} {doctor.firstName} {doctor.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {doctor.professionalTitle}
            </Typography>
            <Stack direction="row" spacing={1} mt={1}>
              <Chip label={doctor.status} color="success" size="small" />
              {/* <Chip
                label={doctor.isEmailVerified ? "Verified" : "Unverified"}
                color={doctor.isEmailVerified ? "success" : "warning"}
                size="small"
              /> */}
            </Stack>
          </Box>

          <Box textAlign="right">
            <Typography fontWeight="bold">${doctor.sessionPrice}</Typography>
            <Typography variant="caption">per session</Typography>
          </Box>
        </Stack>
      </Card>

      {/* QUICK STATS */}
      <Grid container spacing={2} mb={3} alignItems="stretch">
        {[
          { label: "Experience", value: `${doctor.experienceYears} yrs` },
          { label: "License", value: doctor.licenseType },
          { label: "State", value: doctor.licenseState },
          {
            label: "Subscription",
            value: doctor.activeSubscription?.subscriptionPlanName || "NA",
          },
        ].map((item, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography fontWeight="bold">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* MAIN GRID */}
      <Grid container spacing={3} alignItems="stretch">
        {/* CONTACT */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Contact</Typography>
              <Divider sx={{ my: 1 }} />
              <NameCard label="Email" value={doctor.email} />
              <NameCard
                label="Phone"
                value={`${doctor.phoneCountryCode} ${doctor.phoneNo}`}
              />
              <Stack direction="row" mt={0.7} color="gray">
                <Typography
                  variant="subtitle2"
                  fontSize={15}
                  fontWeight={700}
                  sx={{ minWidth: "40%" }}
                >
                  Website
                </Typography>

                <Link href={doctor?.websiteUrl}>: {doctor.websiteUrl}</Link>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* PROFESSIONAL */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Professional</Typography>
              <Divider sx={{ my: 1 }} />
              <NameCard label="License #" value={doctor.licenseNumber} />
              <NameCard
                label="Verified"
                value={doctor.licenseVerified ? "Yes" : "No"}
              />
              <NameCard
                label="Online"
                value={doctor.acceptingOnlineClients ? "Yes" : "No"}
              />
              <NameCard
                label="In-Person"
                value={doctor.acceptingInPersonClients ? "Yes" : "No"}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* SPECIALTIES */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Specialties</Typography>
              <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
                {doctor.specialties.map((s, i) => (
                  <Chip key={i} label={s} color="primary" />
                ))}
              </Stack>

              <Typography variant="h6" mt={3}>
                Languages
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
                {doctor.languages.map((l, i) => (
                  <Chip key={i} label={l} />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* QUALIFICATIONS */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Qualifications</Typography>
              <Divider sx={{ my: 1 }} />
              <Stack spacing={1}>
                {doctor.qualifications.map((q, i) => (
                  <Box key={i}>
                    {/* <Typography fontWeight="bold">{q.degree}</Typography>
                    <Typography variant="body2">
                      {q.institution} ({q.yearCompleted})
                    </Typography> */}
                    <NameCard label="Institution" value={q.institution} />
                    <NameCard label="Degree" value={q.degree} />
                    <NameCard
                      label="Year"
                      value={q.yearCompleted}
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* LOCATIONS */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Locations</Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                {doctor.locations.map((loc, i) => (
                  <Grid item xs={12} md={6} key={i}>
                    <Box
                      sx={{
                        border: "1px solid #eee",
                        p: 2,
                        borderRadius: 2,
                        height: "100%",
                      }}
                    >
                      <Typography>
                        {loc.street}, {loc.city}, {loc.state}
                      </Typography>
                      {loc.isPrimary && (
                        <Chip
                          label="Primary"
                          size="small"
                          color="success"
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* MEDIA */}
        <Grid container spacing={2}>
          {doctor.media.map((m, i) => (
            <Grid item xs={6} md={3} key={i}>
              <a href={m.url} target="_blank" rel="noopener noreferrer">
                {m.mediaType === "video" ? (
                  <video
                    src={m.url}
                    style={{
                      width: "100%",
                      height: 250,
                      objectFit: "cover",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                    muted
                    controls
                  />
                ) : (
                  <img
                    src={m.url}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: 250,
                      objectFit: "cover",
                      borderRadius: 8,
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                  />
                )}
              </a>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorDetailCard;
