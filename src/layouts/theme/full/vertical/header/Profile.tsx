"use client"
import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import * as dropdownData from "./data";

import { IconMail } from "@tabler/icons-react";
import { Stack } from "@mui/system";
import { useSelector } from "@/store/Store";
import { useLogoutMutation } from "@/store/endpoints/auth/authApi";
import notify from "@/utils/toast";
import { ApiErrorResponse } from "@/types/api_response_model";
import { useDispatch } from "react-redux";
import { clearMeData } from "@/store/endpoints/reducer/meDataReducer";
import { useRouter } from "next/navigation";
import { capitalize } from "lodash";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter()

  //meData
  const meData = useSelector((state) => state.meData.meData);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  //logout function

  const handleLogout = async (): Promise<void> => {
    try {
      const loggedoutUser = await logout().unwrap();
      notify(loggedoutUser.message, "success");
      dispatch(clearMeData());
      router.push("/auth/login")
    } catch (error) {
      notify((error as ApiErrorResponse)?.data?.message, "error");
    }
  };

  const userName = `${meData?.firstName} ${meData?.lastName}`

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={"/images/profile/user-1.jpg"}
          alt={"ProfileImg"}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 4,
          },
        }}
      >
        <Typography variant="h5">User Profile</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar
            src={"/images/profile/user-1.jpg"}
            alt={"ProfileImg"}
            sx={{ width: 45, height: 45 }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              fontWeight={600}
            >
              {/* {userName} */}
             {capitalize(userName ?? "")}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {/* Designer */}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              display="flex"
              alignItems="center"
              gap={1}
              fontSize={13}
            >
              <IconMail width={15} height={15} />
              {meData?.email ?? ""}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        {dropdownData.profile.map((profile) => (
          <Box key={profile.title}>
            <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
              <Link href={profile.href}>
                <Stack direction="row" spacing={2}>
                  <Box
                    width="45px"
                    height="45px"
                    bgcolor="primary.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      src={profile.icon}
                      alt={profile.icon}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="textPrimary"
                      className="text-hover"
                      noWrap
                      sx={{
                        width: "240px",
                      }}
                    >
                      {profile.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: "240px",
                      }}
                      noWrap
                    >
                      {profile.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            </Box>
          </Box>
        ))}
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogout}
            disabled={isLogoutLoading}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
