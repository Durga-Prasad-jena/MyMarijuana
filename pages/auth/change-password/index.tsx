import { Grid, Box, Card } from "@mui/material";
import Logo from "@/layouts/theme/full/shared/logo/Logo";
import AuthResetPassword from "../authForms/AuthResetPassword";
import PageContainer from "@/theme-components/container/PageContainer";
import AuthChangePassword from "../authForms/AuthChangePassword";

// components

const ChangePassword = () => {
  return (
    <PageContainer>
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
         
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "450px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthChangePassword />
            </Card>
          </Grid>
      </Box>
    </PageContainer>
  );
};

ChangePassword.layout = "Blank";
export default ChangePassword;
