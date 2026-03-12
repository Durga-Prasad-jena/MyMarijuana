import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BlankCard from "@/components/BlankCard";
import PageContainer from "@/theme-components/container/PageContainer";
import CreateDoctorCard from "@/components/Doctor/CreateDoctorCard";

const CreateDoctor = () => {
  const router = useRouter();
  return (
    <PageContainer>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingBottom={2}
      >
        <Typography variant="h6">Create Doctor</Typography>
        <Button
          variant="text"
          onClick={() => router.back()}
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button>
      </Stack>
      <Divider />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BlankCard>
            <Divider />
            <CreateDoctorCard/>
          </BlankCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CreateDoctor;
