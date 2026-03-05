import React from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector } from '../../../../../../store/Store';
import { IconPower } from '@tabler/icons-react';
import { AppState } from '../../../../../../store/Store';
import { useLogoutMutation } from '@/store/endpoints/auth/authApi';
import notify from '@/utils/toast';
import { useDispatch } from 'react-redux';
import { ApiErrorResponse } from '@/types/api_response_model';
import { clearMeData } from '@/store/endpoints/reducer/meDataReducer';

export const Profile = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

   const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
   const dispatch = useDispatch()

  //meData
    const meData = useSelector((state) => state.meData.meData);
    

    //logout function 
 const handleLogout = async (): Promise<void> => {
    try {
      const loggedoutUser = await logout().unwrap();
      notify(loggedoutUser.message,"success")
      dispatch(clearMeData())
    } catch (error) {
      notify((error as ApiErrorResponse)?.data?.message, "error");
    }
  };

  const userName = meData
    ? `${meData?.firstName}${" "}${meData?.lastName}`
    : "";

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={"/images/profile/user-1.jpg"} />

          <Box>
            <Typography variant="h6" >{userName ?? ""}</Typography>
            {/* <Typography variant="caption">Designer</Typography> */}
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                onClick={handleLogout}
                disabled={isLogoutLoading}
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
