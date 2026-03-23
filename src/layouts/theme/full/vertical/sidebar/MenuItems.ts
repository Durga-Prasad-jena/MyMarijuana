import { uniqueId } from "lodash";

import { IconPoint, IconUserCircle, IconAperture } from "@tabler/icons-react";

export interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

export interface MenuitemsHelpers {
  NavLabel(name: string): MenuitemsType;
  NavItem(icon: any, title: string, href: string): MenuitemsType;
  NavItemMutate(navItem: MenuitemsType, func: any): MenuitemsType;
  NavItemWithChip(
    navItem: MenuitemsType,
    chip: string,
    chipColor: string,
  ): MenuitemsType;
  NavDropdown(navItem: MenuitemsType, children: MenuitemsType[]): MenuitemsType;
}

export const helpers: MenuitemsHelpers = {
  NavLabel: (name: string): MenuitemsType => ({
    navlabel: true,
    subheader: name,
  }),
  NavItem: (icon: any, title: string, href: string): MenuitemsType => ({
    icon,
    title,
    href,
    id: uniqueId(),
  }),
  NavItemMutate: (navItem: MenuitemsType, func: any): MenuitemsType =>
    func(navItem),
  NavItemWithChip: (
    navItem: MenuitemsType,
    chip: string,
    chipColor: string,
  ): MenuitemsType => ({
    ...navItem,
    id: navItem.id || uniqueId(),
    chip,
    chipColor,
  }),
  NavDropdown: (
    navItem: MenuitemsType,
    children: MenuitemsType[],
  ): MenuitemsType => ({
    ...navItem,
    id: navItem.id || uniqueId(),
    children,
  }),
};

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Doctor Management",
    icon: IconAperture,
    href: "/dashboards/doctor",
    // chip: 'New',
    chipColor: "secondary",
  },
  {
    id: uniqueId(),
    title: "Specialties",
    icon: IconUserCircle,
    href: "/dashboards/specialities",
    chipColor: "secondary",
  },
  {
    id: uniqueId(),
    title: "Languages",
    icon: IconUserCircle,
    href: "/dashboards/languages",
    chipColor: "secondary",
  },
];

export default Menuitems;
