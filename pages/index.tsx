import React from "react";
import PageContainer from "../src/theme-components/container/PageContainer";

// components

import Modern from "./dashboards/modern";
import Sidebar from "@/layouts/theme/full/vertical/sidebar/Sidebar";
import { MenuitemsType } from "@/layouts/theme/full/vertical/sidebar/MenuItems";

interface Props extends React.PropsWithChildren {
  sidebarMenuitems?: MenuitemsType[],
  headerMenuitems?: MenuitemsType[]
}

const Landingpage: React.FC<Props> = ({ sidebarMenuitems }) => {
  return (
    <PageContainer>
     <Sidebar menuItems={sidebarMenuitems}/>
     <Modern />
    </PageContainer>
  );
};

export default Landingpage;
