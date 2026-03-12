import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from "@mui/material";
import { useDoctorDetailByIdQuery } from "@/store/endpoints/doctor/doctorApi";

const data = {
  userId: "usr_102938",
  role: "Doctor",
  title: "Dr.",
  firstName: "Amit",
  lastName: "Sharma",
  email: "amit.sharma@mindcareclinic.com",
  avatar: "https://i.pravatar.cc/300?img=12",
  phoneCountryCode: "+91",
  phoneNo: "9876543210",
  licenseType: "Psychiatrist",
  websiteUrl: "https://mindcareclinic.com",
  isActive: true,
  isEmailVerified: true,
  createdAt: "2026-03-10T13:59:27.039Z",
  updatedAt: "2026-03-10T13:59:27.039Z",

  doctorProfile: {
    doctorProfileId: "docprof_56789",
    professionalTitle: "Consultant Psychiatrist",
    bio: "Dr. Amit Sharma is a highly experienced psychiatrist specializing in anxiety disorders, depression, and cognitive behavioral therapy. He has helped hundreds of patients improve their mental well-being through evidence-based treatments.",
    experienceYears: 12,
    licenseNumber: "MH-PSY-90876",
    licenseState: "Maharashtra",
    licenseVerified: true,
    acceptingNewClients: true,
    emailForPatients: "appointments@mindcareclinic.com",
    phoneForPatients: "+91 9000012345",

    qualifications: [
      {
        id: "qual_1",
        degree: "MBBS",
        institution: "AIIMS Delhi",
        yearCompleted: 2008,
        credentialType: "Medical Degree",
        displayOrder: 1,
      },
      {
        id: "qual_2",
        degree: "MD Psychiatry",
        institution: "NIMHANS Bangalore",
        yearCompleted: 2012,
        credentialType: "Postgraduate Degree",
        displayOrder: 2,
      },
    ],

    specialties: [
      { id: "sp_1", name: "Anxiety Disorders" },
      { id: "sp_2", name: "Depression" },
      { id: "sp_3", name: "Stress Management" },
    ],

    therapies: [
      { id: "th_1", name: "Cognitive Behavioral Therapy (CBT)" },
      { id: "th_2", name: "Mindfulness Therapy" },
    ],

    languages: [
      { id: "lang_1", name: "English" },
      { id: "lang_2", name: "Hindi" },
      { id: "lang_3", name: "Bengali" },
    ],

    insurances: [
      { id: "ins_1", name: "Star Health Insurance" },
      { id: "ins_2", name: "ICICI Lombard Health Insurance" },
    ],

    locations: [
      {
        id: "loc_1",
        clinicName: "MindCare Mental Health Clinic",
        street: "21 Park Street",
        city: "Kolkata",
        state: "West Bengal",
        country: "India",
        postalCode: "700016",
        latitude: 22.5448,
        longitude: 88.3426,
        isPrimary: true,
        phone: "+91 9830011122",
        email: "kolkata@mindcareclinic.com",
      },
      {
        id: "loc_2",
        clinicName: "MindCare Wellness Center",
        street: "45 MG Road",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
        postalCode: "560001",
        latitude: 12.9716,
        longitude: 77.5946,
        isPrimary: false,
        phone: "+91 9988776655",
        email: "bangalore@mindcareclinic.com",
      },
    ],

    clientFocus: ["Adults", "Adolescents", "Couples Therapy"],

    createdAt: "2026-03-10T13:59:27.039Z",
    updatedAt: "2026-03-10T13:59:27.039Z",
  },
};

interface DoctorDetailCardPropTypes {
  doctorId: string;
}

const DoctorDetailCard: React.FC<Partial<DoctorDetailCardPropTypes>> = ({
  doctorId,
}) => {
  console.log("doctorId", doctorId);
  const doctor = data?.doctorProfile;
  const { data: doctorDetails, isLoading } = useDoctorDetailByIdQuery(
    {
      id: doctorId!,
    },
    {
      skip: !doctorId,
    },
  );
  return (
    <>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        doctorDetails && (
          <Grid container spacing={3} p={3}>
            {/* Doctor Basic Info */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Avatar src={doctorDetails?.avatar} sx={{ width: 80, height: 80 }} />
                    <div>
                      <Typography variant="h5">
                        {doctorDetails?.title} {doctorDetails?.firstName} {doctorDetails?.lastName}
                      </Typography>

                      {/* <Typography color="text.secondary">
                        {doctorDetails?.professionalTitle}
                      </Typography> */}

                      <Stack direction="row" spacing={1} mt={1}>
                        <Chip
                          label={doctorDetails?.isActive ? "Active" : "Inactive"}
                          color={doctorDetails?.isActive ? "success" : "default"}
                        />
                        <Chip
                          label={
                            doctorDetails?.isEmailVerified
                              ? "Email Verified"
                              : "Email Not Verified"
                          }
                          color={doctorDetails?.isEmailVerified ? "success" : "warning"}
                        />
                      </Stack>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Contact Information</Typography>
                  <Divider sx={{ my: 1 }} />

                  <Typography>Email: {doctorDetails?.email}</Typography>
                  <Typography>
                    Phone: {doctorDetails?.phoneCountryCode} {doctorDetails?.phoneNo}
                  </Typography>
                  <Typography>Website: {doctorDetails?.websiteUrl}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Professional Info */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Professional Information</Typography>
                  <Divider sx={{ my: 1 }} />

                  <Typography>
                    Experience: {doctorDetails?.experienceYears} years
                  </Typography>

                  <Typography>
                    License Number: {doctorDetails?.licenseNumber}
                  </Typography>

                  <Typography>License State: {doctorDetails?.licenseState}</Typography>

                  <Typography>
                    Accepting Clients:{" "}
                    {doctorDetails?.acceptingNewClients ? "Yes" : "No"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Bio */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Biography</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography>{doctorDetails?.bio}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Qualifications */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Qualifications</Typography>
                  <Divider sx={{ my: 2 }} />

                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Degree</TableCell>
                        <TableCell>Institution</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Credential</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {doctorDetails?.qualifications?.map((q,i) => (
                        <TableRow key={i}>
                          <TableCell>{q.degree}</TableCell>
                          <TableCell>{q.institution}</TableCell>
                          <TableCell>{q.yearCompleted}</TableCell>
                          <TableCell>{q.credentialType}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Grid>

            {/* Tags Section */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Specialties</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                    {doctorDetails?.specialties?.map((s,i) => (
                      <Chip key={i} label={s} color="primary" />
                    ))}
                  </Stack>

                  <Typography variant="h6" mt={3}>
                    Therapies
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                    {doctorDetails?.therapies?.map((t,i) => (
                      <Chip key={i} label={t} color="secondary" />
                    ))}
                  </Stack>

                  <Typography variant="h6" mt={3}>
                    Languages
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                    {doctorDetails?.languages?.map((l,i) => (
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
                  <Typography variant="h6">Clinic Locations</Typography>
                  <Divider sx={{ my: 2 }} />

                  {doctorDetails?.locations?.map((loc,i) => (
                    <Card key={i} variant="outlined" sx={{ mb: 2, p: 2 }}>
                      <Typography fontWeight="bold">
                        {loc.clinicName}
                      </Typography>

                      <Typography>
                        {loc.street}, {loc.city}, {loc.state}
                      </Typography>

                      <Typography>
                        {loc.country} - {loc.postalCode}
                      </Typography>

                      <Typography>Phone: {loc.phone}</Typography>
                      <Typography>Email: {loc.email}</Typography>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )
      )}
    </>
  );
};

export default DoctorDetailCard;
