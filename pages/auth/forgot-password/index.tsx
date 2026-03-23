import Logo from '@/layouts/theme/full/shared/logo/Logo';
import { Grid, Box, Card, Typography } from '@mui/material';
import AuthForgotPassword from '../authForms/AuthForgotPassword';
import PageContainer from '@/theme-components/container/PageContainer';

const ForgotPassword2 = () => (
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
        
          <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Logo />
            </Box>
            <Typography
              color="textSecondary"
              textAlign="center"
              variant="subtitle2"
              fontWeight="400"
            >
              Please enter the email address associated with your account and We will email you a
              link to reset your password.
            </Typography>
            <AuthForgotPassword />
          </Card>
      </Grid>
    </Box>
  </PageContainer>
);

ForgotPassword2.layout = "Blank";
export default ForgotPassword2;
