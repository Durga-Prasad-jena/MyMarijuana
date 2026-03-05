import Link from 'next/link';
import { Grid, Box, Card, Stack, Typography } from '@mui/material';
import Logo from '@/layouts/theme/full/shared/logo/Logo';
import AuthLogin from '../authForms/AuthLogin';
import PageContainer from '@/theme-components/container/PageContainer';

// components


const Login2 = () => {
  
  return (
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
              <AuthLogin
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight="500">
                      New to Modernize?
                    </Typography>
                    <Typography
                      component={Link}
                      href="/auth/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      Create an account
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
      </Box>
    </PageContainer>
  );
};

Login2.layout = "Blank";
export default Login2;
