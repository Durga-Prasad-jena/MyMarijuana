import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BlankCard from "@/components/BlankCard";
import PageContainer from "@/theme-components/container/PageContainer";
import DoctorDetailCard from "@/components/Doctor/DoctorDetailCard";

const DoctorDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  

  return (
    <PageContainer>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingBottom={2}
      >
        <Typography variant="h6">Order Details</Typography>
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
            <DoctorDetailCard  doctorId={doctorId!}/>
          </BlankCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default DoctorDetail;
