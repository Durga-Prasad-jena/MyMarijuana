import {
    IconAperture,
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

    NavItemWithChip(
        NavItem(IconAperture, "Modern", '/dashboards/modern'),
        "New", "secondary"
    ),

    NavItem(IconShoppingCart, "eCommerce", '/dashboards/ecommerce'),

    NavLabel("Apps"),

    NavDropdown(
        NavItem(IconChartDonut3, 'Blog', '/apps/blog/'),
        [
            NavItem(IconPoint, 'Posts', '/apps/blog/post'),
            NavItem(IconPoint, "Detail", '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow')
        ]
    )
];

export default Menuitems;
