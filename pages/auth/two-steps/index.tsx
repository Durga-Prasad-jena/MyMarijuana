import { Grid, Box, Card, Typography } from '@mui/material';
import Logo from '../../../src/layouts/theme/full/shared/logo/Logo';
import AuthTwoSteps from '../authForms/AuthTwoSteps';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PageContainer from '@/theme-components/container/PageContainer';

const TwoSteps2 = () =>{
  const router = useRouter()
  const {emailAddress} = router.query;
  const [count,setCount]=useState<number>(60);
  const [isRenderDisable,setIsRenderDisable]=useState<boolean>(true)
  console.log("count",count)

  useEffect(() => {
    let timer:ReturnType<typeof setTimeout>;
    if (count > 0) {
      timer = setTimeout(() => setCount(count - 1), 1000);
    } else {
      setIsRenderDisable(false);
    }
    return () => clearTimeout(timer);
  }, [count]);

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
            <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
              We sent a verification code to your mobile. Enter the code from the mobile in the
              field below.
            </Typography>
            <Typography variant="subtitle1" textAlign="center" fontWeight="700" mb={1}>
              ******1234
            </Typography>
            <Typography variant="subtitle1" textAlign="center" fontWeight="700" mb={1} fontSize={20}>
              {count}
            </Typography>
            <AuthTwoSteps  isRenderDisable={isRenderDisable} emailAddress={emailAddress} setCount={setCount} setIsRenderDisable={setIsRenderDisable} />
          </Card>
        </Grid>
    </Box>
  </PageContainer>
  );
}

TwoSteps2.layout = "Blank";
export default TwoSteps2;
