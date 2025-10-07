import React from "react";
import { Box, Typography, Avatar, Stack, styled, Button } from "@mui/material";
import NextLink from "next/link";

import Image from "next/image";

interface DemoTypes {
  link: string;
  img: string | any;
  title: string;
}

const demos: DemoTypes[] = [
  {
    link: "https://modernize-nextjs.adminmart.com/landingpage",
    img: "/images/landingpage/demos/demo-main.jpg",
    title: "Main",
  },
  {
    link: "https://modernize-nextjs-dark.netlify.app/ecommerce",
    img: "/images/landingpage/demos/demo-dark.jpg",
    title: "Dark",
  },
  {
    link: "https://modernize-nextjs-horizontal.netlify.app/modern",
    img: "/images/landingpage/demos/demo-horizontal.jpg",
    title: "Horizontal",
  },
  {
    link: "https://modernize-nextjs-rtl.netlify.app/dashboards/ecommerce",
    img: "/images/landingpage/demos/demo-rtl.jpg",
    title: "RTL",
  },
];

const apps: DemoTypes[] = [
  {
    link: "https://modernize-nextjs.adminmart.com/apps/calendar",
    img: "/images/landingpage/apps/app-calendar.jpg",
    title: "Calendar",
  },
  {
    link: "https://modernize-nextjs.adminmart.com/apps/chats",
    img: "/images/landingpage/apps/app-chat.jpg",
    title: "Chat",
  },
  {
    link: "https://modernize-nextjs.adminmart.com/apps/contacts",
    img: "/images/landingpage/apps/app-contact.jpg",
    title: "Contact",
  },
  {
    link: "https://modernize-nextjs.adminmart.com/apps/email",
    img: "/images/landingpage/apps/app-email.jpg",
    title: "Email",
  },
  {
    link: "https://modernize-nextjs.adminmart.com/apps/notes",
    img: "/images/landingpage/apps/app-note.jpg",
    title: "Note",
  },
];

const StyledBox = styled(Box)(() => ({
  overflow: "auto",
  position: "relative",
  ".MuiButton-root": {
    display: "none",
  },
  "&:hover": {
    ".MuiButton-root": {
      display: "block",
      transform: "translate(-50%,-50%)",
      position: "absolute",
      left: "50%",
      right: "50%",
      top: "50%",
      minWidth: "100px",
      zIndex: "9",
    },
    "&:before": {
      content: '""',
      position: "absolute",
      top: "0",
      left: " 0",
      width: "100%",
      height: "100%",
      zIndex: "8",
      backgroundColor: "rgba(55,114,255,.2)",
    },
  },
}));

const DemosDD = () => {
  return (
    <>
      <Box p={4}>
        <Typography variant="h5">Different Demos</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Included with the package
        </Typography>

        <Stack mt={2} spacing={3} direction={{ xs: "column", lg: "row" }}>
          {demos.map((demo, index) => (
            <Box key={index}>
              {/* <Link href={demo.link}> */}
              <StyledBox>
                <Image
                  src={demo.img}
                  alt="demo"
                  width={300}
                  style={{
                    borderRadius: "8px",
                    width: "100%",
                    height: "100%",
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  href={demo.link}
                  target="_blank"
                >
                  Live Preview
                </Button>
              </StyledBox>
              {/* </Link> */}
              <Typography
                variant="body1"
                color="textPrimary"
                textAlign="center"
                fontWeight={500}
                mt={2}
              >
                {demo.title}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Typography variant="h5" mt={5}>
          Different Apps
        </Typography>

        <Stack
          mt={2}
          spacing={3}
          mb={2}
          direction={{ xs: "column", lg: "row" }}
        >
          {apps.map((app, index) => (
            <Box key={index}>
              {/* <Link href={app.link}> */}
              <StyledBox>
                <Image
                  src={app.img}
                  alt="demo"
                  style={{
                    borderRadius: "8px",
                    width: "100%",
                    height: "100%",
                  }}
                />
                <NextLink href={app.link}>
                  <Button variant="contained" color="primary" size="small">
                    Live Preview
                  </Button>
                </NextLink>
                {/* </Link> */}
              </StyledBox>
              <Typography
                variant="body1"
                color="textPrimary"
                textAlign="center"
                fontWeight={500}
                mt={2}
              >
                {app.title}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default DemosDD;
