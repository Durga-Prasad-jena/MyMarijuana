import {
    IconAperture,
    IconPackage,
    IconShoppingCart,
    IconChartDonut3,
    IconPoint
 } from "@tabler/icons-react";

import { MenuitemsType, helpers } from "../../layouts/theme/full/vertical/sidebar/MenuItems";


const { NavLabel, NavItem,
    NavItemWithChip, NavDropdown,
    NavItemMutate } = helpers;


const Menuitems : MenuitemsType[] = [
    NavLabel("Home"),
    NavItem(IconAperture, "Home", '/dashboard/home'),

    NavItem(IconShoppingCart, "Tree View", '/dashboard/treeview'),

    NavLabel("Demos"),

    NavItemWithChip(
        NavItem(IconPackage, "eCommerce", '/dashboard/ecommerce'),
        "2", "secondary"
    ),
    
    NavItem(IconPackage, "Calendar", '/dashboard/calendar'),

    NavDropdown(
        NavItem(IconChartDonut3, 'Tables', '/dashboard/tables'),
        [
            NavItem(IconPoint, 'Basic Table', '/dashboard/basic-table'),
            NavItem(IconPoint, "Enhanced Table", '/dashboard/enhanced-table')
        ]
    )
];

export default Menuitems;
