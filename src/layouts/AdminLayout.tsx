import React from "react";
import { styled, Container, Box, useTheme } from "@mui/material";
import { useSelector } from "../store/Store";
import { AppState } from "../store/Store";
import Header from "./theme/full/vertical/header/Header";
import Sidebar from "./theme/full/vertical/sidebar/Sidebar";
import Customizer from "./theme/full/shared/customizer/Customizer";
import sidebarMenuConfig from "../data/admin/SidebarMenuItems";
import headerMenuConfig from "../data/admin/HeaderMenuItems";
import {MenuitemsType} from "./theme/full/vertical/sidebar/MenuItems";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

interface Props extends React.PropsWithChildren {
  sidebarMenuitems?: MenuitemsType[],
  headerMenuitems?: MenuitemsType[]
}




// See FullLayout.tsx for more customizability
const AdminLayout: React.FC<Props> = ({ children, sidebarMenuitems, headerMenuitems }) => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();

  return (
    <MainWrapper>
      <Sidebar menuItems={sidebarMenuitems || sidebarMenuConfig} />
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up("lg")]: {
              ml: `${customizer.MiniSidebarWidth}px`,
            },
          }),
        }}>
          
        <Header menuItems={headerMenuitems || headerMenuConfig} />
        <Container
          sx={{
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important",
          }}>

          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            {/* <Outlet /> */}
            {children}
            {/* <Index /> */}
          </Box>

        </Container>
        <Customizer />
      </PageWrapper>
    </MainWrapper>
  );
};

export default AdminLayout;
