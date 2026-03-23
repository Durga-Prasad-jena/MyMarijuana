import React from "react";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

// MUI imports
import {
  ListItemIcon,
  ListItemText,
  Box,
  ListItemButton,
  styled,
} from "@mui/material";

// Redux store
import { useSelector } from "../../../../../../store/Store";
import { AppState } from "../../../../../../store/Store";

// Custom components
import NavItem from "../NavItem/NavItem";

// Icons
import { IconChevronDown } from "@tabler/icons-react";

type NavGroupProps = {
  [x: string]: any;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
};

interface NavCollapseProps {
  menu: NavGroupProps;
  level: number;
  pathWithoutLastPart: any;
  pathDirect: any;
  hideMenu: any;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

// FC Component For Dropdown Menu
const NavCollapse: React.FC<NavCollapseProps> = ({
  menu,
  level,
  pathWithoutLastPart,
  pathDirect,
  hideMenu,
  onClick,
}) => {
  const Icon = menu.icon;
  const theme = useTheme();
  const { pathname } = useRouter();
  const [open, setOpen] = React.useState(false);
  const customizer = useSelector((state: AppState) => state.customizer);

  const menuIcon =
    level > 1 ? (
      <Icon stroke={1.5} size="1rem" />
    ) : (
      <Icon stroke={1.5} size="1.1rem" />
    );

  React.useEffect(() => {
    setOpen(false);
    menu.children?.forEach((item: any) => {
      if (item.href === pathname) {
        setOpen(true);
      }
    });
  }, [pathname, menu.children]);

  // Styled ListItemButton
  const ListItemStyled = styled(ListItemButton)(() => ({
    width: "auto",
    padding: "5px 10px",
    position: "relative",
    flexGrow: "unset",
    gap: "10px",
    borderRadius: `${customizer.borderRadius}px`,
    whiteSpace: "nowrap",
    color:
      open || pathname.includes(menu.href) || level < 1
        ? "white"
        : theme.palette.text.secondary,
    backgroundColor:
      open || pathname.includes(menu.href) ? theme.palette.primary.main : "",

    "&:hover": {
      backgroundColor:
        open || pathname.includes(menu.href)
          ? theme.palette.primary.main
          : theme.palette.primary.light,
    },
    "&:hover > .SubNav": { display: "block" },
  }));

  // Styled Box for submenus
  const ListSubMenu = styled(Box)(() => ({
    display: "none",
    position: "absolute",
    top: level > 1 ? `0px` : "35px",
    left: level > 1 ? `${level + 228}px` : "0px",
    padding: "10px",
    width: "250px",
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[8],
    backgroundColor: theme.palette.background.paper,
  }));

  // Render submenu items
  const submenus = menu.children?.map((item: any) => {
    if (item.children) {
      return (
        <NavCollapse
          key={item.id}
          menu={item}
          level={level + 1}
          pathWithoutLastPart={pathWithoutLastPart}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        />
      );
    } else {
      return (
        <NavItem
          key={item.id}
          item={item}
          level={level + 1}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        />
      );
    }
  });

  return (
    <React.Fragment key={menu.id}>
      <ListItemStyled
        as="li" // ✅ Use 'as' instead of 'component' for styled ListItemButton
        selected={pathWithoutLastPart === menu.href}
        className={open ? "selected" : ""}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: "auto",
            p: "3px 0",
            color: "inherit",
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText color="inherit" sx={{ mr: "auto" }}>
          {menu.title}
        </ListItemText>
        <IconChevronDown size="1rem" />
        <ListSubMenu as="ul" className="SubNav">
          {submenus}
        </ListSubMenu>
      </ListItemStyled>
    </React.Fragment>
  );
};

export default NavCollapse;