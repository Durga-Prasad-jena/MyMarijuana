import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BlankCard from "@/components/BlankCard";
import PageContainer from "@/theme-components/container/PageContainer";
import UpdateProfileCard from "@/components/Doctor/UpdateProfileCard";

const UpdateProfile = () => {
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
        <Typography variant="h6">Update Doctor Profile</Typography>
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
            <Card sx={{ p: 3 }}>
              <CardContent>
                <UpdateProfileCard doctorId={doctorId!}/>
              </CardContent>
            </Card>
          </BlankCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UpdateProfile;
