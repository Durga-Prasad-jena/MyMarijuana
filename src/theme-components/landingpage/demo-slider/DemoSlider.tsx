import {
  Box,
  Container,
  Button,
  styled,
  Typography,
  Grid,
} from "@mui/material";

// images
import DemoTitle from "./DemoTitle";
import Image from "next/image";

interface sliderData {
  avatar: string | any;
  link: string;
  demo: string;
  applink?: boolean;
}

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
    link: "https://modernize-nextjs-dark.netlify.app/dashboards/ecommerce",
    img: "/images/landingpage/demos/demo-dark.jpg",
    title: "Dark",
  },
  {
    link: "https://modernize-nextjs-horizontal.netlify.app/dashboards/modern",
    img: "/images/landingpage/demos/demo-horizontal.jpg",
    title: "Horizontal",
  },
  {
    link: "https://modernize-nextjs-rtl.netlify.app/dashboards/modern",
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

const DemoSlider = () => {
  return (
    <Box
      pb="140px"
      overflow="hidden"
      sx={{
        pt: {
          sm: "60px",
          lg: "0",
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <DemoTitle />

        {/* demos */}
        <Box mt={9}>
          <Grid container mt={2} spacing={3}>
            {demos.map((demo, index) => (
              <Grid item xs={12} lg={3} key={index}>
                <Box>
                  {/* <Link href={demo.link}> */}
                  <StyledBox>
                    <Image
                      src={demo.img}
                      alt="demo"
                      width={300}
                      height={200}
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
                    variant="h6"
                    color="textPrimary"
                    textAlign="center"
                    fontWeight={500}
                    mt={2}
                  >
                    {demo.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* apps */}
        <Box>
          <Grid container mt={2} spacing={3}>
            {apps.map((app, index) => (
              <Grid item xs={12} lg={3} key={index}>
                <Box>
                  {/* <Link href={app.link}> */}
                  <StyledBox>
                    <Image
                      src={app.img}
                      alt="app"
                      width={300}
                      height={200}
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
                      href={app.link}
                      target="_blank"
                    >
                      Live Preview
                    </Button>
                  </StyledBox>
                  {/* </Link> */}
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    textAlign="center"
                    fontWeight={500}
                    mt={2}
                  >
                    {app.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default DemoSlider;
