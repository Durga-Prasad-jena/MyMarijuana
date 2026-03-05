import Logo from '@/layouts/theme/full/shared/logo/Logo';
import { Grid, Box, Card, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import AuthRegister from '../authForms/AuthRegister';
import PageContainer from '@/theme-components/container/PageContainer';


const Register2 = () => (
  <PageContainer>
    <Box
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.3',
        },
      }}
    >
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        
          <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Logo />
            </Box>
            <AuthRegister
              subtext={
                <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                  Your Social Campaigns
                </Typography>
              }
              subtitle={
                <Stack direction="row" spacing={1} mt={3}>
                  <Typography color="textSecondary" variant="h6" fontWeight="400">
                    Already have an Account?
                  </Typography>
                  <Typography 
                    component={Link}
                    href="/auth/auth1/login"
                    fontWeight="500"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                  >
                    Sign In
                  </Typography>
                </Stack>
              }
            />
          </Card>
        </Grid>
    </Box>
  </PageContainer>
);

Register2.layout = "Blank";
export default Register2;
