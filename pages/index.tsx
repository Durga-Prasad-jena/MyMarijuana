import React from "react";

// components

import Sidebar from "@/layouts/theme/full/vertical/sidebar/Sidebar";
import { MenuitemsType } from "@/layouts/theme/full/vertical/sidebar/MenuItems";
import { useMeDataQuery } from "@/store/endpoints/auth/authApi";
import PageContainer from "@/theme-components/container/PageContainer";



interface Props extends React.PropsWithChildren {
  sidebarMenuitems?: MenuitemsType[],
  headerMenuitems?: MenuitemsType[]
}


const Landingpage: React.FC<Props> = ({ sidebarMenuitems }) => {
  const {data} = useMeDataQuery()
  console.log(data)
  return (
    <PageContainer>
     <Sidebar menuItems={sidebarMenuitems}/>
    </PageContainer>
  );
};

export default Landingpage;
