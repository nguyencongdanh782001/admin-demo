import {
  AppBar,
  IconButton,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, NavLink } from "react-router-dom";

export const NavbarContainer = styled(AppBar)(({ theme }) => ({
  position: "sticky",
  top: "0",
}));

export const NavbarWrapper = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const NavbarToggle = styled(IconButton)(({ theme }) => ({}));

export const UserButton = styled(Button)(({ theme }) => ({}));

export const UserMenu = styled(Menu)(({ theme }) => ({}));

export const UserMenuItem = styled(MenuItem)(({ theme }) => ({}));

export const UserMenuItemIcon = styled(ListItemIcon)(({ theme }) => ({}));

export const UserMenuItemText = styled(ListItemText)(({ theme }) => ({
  color: "red",
}));

export const NavBarDrawer = styled(Drawer)(({ theme }) => ({}));

export const NavBarDrawerMenuItemTitle = styled("li")(({ theme }) => ({
  marginBottom: "20px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const NavBarDrawerMenuItemTitleLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  textAlign: "center",
  fontSize: "25px",
  fontWeight: "600",
  color: "white",
  textShadow: "4px 4px 3px black",
  textTransform: "uppercase",
  cursor: "pointer",
}));

export const NavBarDrawerMenuList = styled("ul")(({ theme }) => ({
  width: "300px",
  minHeight: "100vh",
  backgroundColor: "rgb(49 46 129)",
  padding: "20px 7px 0px 7px",
}));

export const NavBarDrawerMenuItem = styled("li")(({ theme }) => ({
  width: "100%",
  listStyle: "none",
  marginBottom: "5px",
}));

export const NavBarDrawerMenuLink = styled(NavLink)(({ theme }) => ({
  width: "100%",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "10px 0px 10px 7px",
  borderRadius: "6px",
  color: "white",
  transition: "0.3s",
  "&:hover, &.active": {
    backgroundColor: "white",
    color: "rgb(67 56 202)",
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
  },
}));

export const NavBarDrawerMenuLinkIcon = styled("span")(({ theme }) => ({
  minWidth: "35px",
}));

export const NavBarDrawerMenuLinkText = styled("span")(({ theme }) => ({}));
