import NextLink from "next/link";
import Image from "next/image";
import { Box, CardContent, Grid, Typography } from "@mui/material";

const topcards = [
  {
    href: "/apps/user-profile/profile",
    icon: "/images/svgs/icon-user-male.svg",
    title: "Profile",
    digits: "3,685",
    bgcolor: "primary",
  },
  {
    href: "/apps/blog/post",
    icon: "/images/svgs/icon-briefcase.svg",
    title: "Blog",
    digits: "256",
    bgcolor: "warning",
  },
  {
    href: "/apps/calendar",
    icon: "/images/svgs/icon-mailbox.svg",
    title: "Calendar",
    digits: "932",
    bgcolor: "secondary",
  },
  {
    href: "/apps/email",
    icon: "/images/svgs/icon-favorites.svg",
    title: "Email",
    digits: "$348K",
    bgcolor: "error",
  },
  {
    href: "/apps/chats",
    icon: "/images/svgs/icon-speech-bubble.svg",
    title: "Chats",
    digits: "96",
    bgcolor: "success",
  },
  {
    href: "/apps/contacts",
    icon: "/images/svgs/icon-connect.svg",
    title: "Contacts",
    digits: "48",
    bgcolor: "info",
  },
];

const TopCards = () => {
  return (
    <Grid container spacing={3} mt={3}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={2} key={i}>
          <NextLink href={topcard.href}>
            <Box bgcolor={topcard.bgcolor + ".light"} textAlign="center">
              <CardContent>
                <Image src={topcard.icon} alt={"topcard.icon"} width={50} height={50} />
                <Typography
                  color={topcard.bgcolor + ".main"}
                  mt={1}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  {topcard.title}
                </Typography>
                <Typography
                  color={topcard.bgcolor + ".main"}
                  variant="h4"
                  fontWeight={600}
                >
                  {topcard.digits}
                </Typography>
              </CardContent>
            </Box>
          </NextLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
