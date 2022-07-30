import { styled } from "@mui/system";
import { Link, NavLink } from "react-router-dom";

export const SideBarContainer = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  width: "100%",
  paddingLeft: "8px",
  border: "none",
}));

export const SideBarMenuList = styled("ul")(({ theme }) => ({
  width: "100%",
  marginTop: "41px",
}));

export const SideBarMenuItem = styled("li")(({ theme }) => ({
  listStyle: "none",
}));

export const SideBarMenuLink = styled(NavLink)(({ theme }) => ({
  position: "relative",
  borderTopLeftRadius: "35px",
  borderBottomLeftRadius: "35px",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "white",
  width: "100%",
  height: "55px",
  "&:hover, &.active": {
    backgroundColor: "white",
  },
  "&:hover ,&.active": {
    color: "rgb(67 56 202)",
  },
  "&:hover::before, &.active::before": {
    content: '""',
    position: "absolute",
    right: "0",
    top: "-50px",
    borderRadius: "50%",
    height: "50px",
    width: "50px",
    boxShadow: "35px 35px 0 10px white",
  },
  "&:hover::after, &.active::after": {
    content: '""',
    position: "absolute",
    right: "0",
    bottom: "-50px",
    borderRadius: "50%",
    height: "50px",
    width: "50px",
    boxShadow: "35px -35px 0 10px white",
    zIndex: "0",
  },
}));

export const SideBarMenuLinkIcon = styled("span")(({ theme }) => ({
  position: "relative",
  display: "block",
  minWidth: "60px",
  textAlign: "center",
  zIndex: "10",
  "& svg": {
    fontSize: "1.75rem",
  },
}));

export const SideBarMenuLinkText = styled("span")(({ theme }) => ({
  position: "relative",
  display: "block",
  whiteSpace: "nowrap",
  textTransform: "capitalize",
}));

export const SideBarLogo = styled(Link)(({ theme }) => ({
  marginTop: "5px",
  position: "relative",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "white",
  width: "100%",
  height: "40px",
  cursor: "pointer",
}));

export const SideBarLogoIcon = styled("span")(({ theme }) => ({
  position: "relative",
  display: "block",
  minWidth: "60px",
  textAlign: "center",
  zIndex: "10",
  "& svg": {
    fontSize: "1.75rem",
  },
}));

export const SideBarLogoText = styled("span")(({ theme }) => ({
  position: "relative",
  display: "block",
  whiteSpace: "nowrap",
  textTransform: "uppercase",
  fontSize: "20px",
  fontWeight: "600",
}));
