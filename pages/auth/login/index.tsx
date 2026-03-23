import Link from "next/link";
import { Box, Card, Stack, Typography, Grid } from "@mui/material";
import Logo from "@/layouts/theme/full/shared/logo/Logo";
import AuthLogin from "../authForms/AuthLogin";
import PageContainer from "@/theme-components/container/PageContainer";

const Login2 = () => {
  return (
    <PageContainer>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: 0.3,
          },
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item xs={11} sm={8} md={6} lg={4}>
            <Card
              elevation={9}
              sx={{
                p: 4,
                zIndex: 1,
                width: "100%",
                maxWidth: 450,
                borderRadius: 3,
              }}
            >
              <Box display="flex" justifyContent="center" mb={2}>
                <Logo />
              </Box>

              <AuthLogin
                subtitle={
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt={3}
                  >
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="500"
                    >
                      Don't have an account?
                    </Typography>

                    <Typography
                      component={Link}
                      href="/auth/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                      }}
                    >
                      Signup
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

Login2.layout = "Blank";

export default Login2;
