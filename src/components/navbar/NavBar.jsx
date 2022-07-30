import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import NavBarMobile from "./navbarmobile/NavBarMobile";
import NavBarPc from "./navbarpc/NavBarPc";

const NavBar = ({ handleToggleClick }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  return matches ? (
    <NavBarMobile />
  ) : (
    <NavBarPc handleToggleClick={handleToggleClick} />
  );
};

export default NavBar;
