import { styled } from "@mui/system";

export const LayoutContainer = styled("main")(({ theme }) => ({
  position: "relative",
  minWidth: "100%",
}));

export const LayoutLeft = styled("section")(({ theme }) => ({
  width: "300px",
  minHeight: "100vh",
  transition: "0.5s",
  position: "fixed",
  top: "0",
  backgroundColor: "rgb(49 46 129)",
  overflow: "hidden",
  border: "none",
  "&.actvie": {
    width: "68px",
  },
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

export const LayoutRight = styled("section")(({ theme }) => ({
  position: "absolute",
  left: "300px",
  minHeight: "100vh",
  width: "calc(100% - 300px)",
  backgroundColor: "white",
  transition: "0.5s",

  "&.actvie": {
    left: "68px",
    width: "calc(100% - 68px)",
  },

  [theme.breakpoints.down("lg")]: {
    width: "100%",
    left: "0",
    "&.actvie": {
      width: "100%",
      left: "0",
    },
  },
}));

export const LayoutRightContainer = styled("div")(({ theme }) => ({
  padding: "20px 15px",
  height: "100%",
}));
