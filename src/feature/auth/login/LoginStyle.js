import { Button, styled, Typography } from "@mui/material";
import { VAPE_BACKGROUND } from "../../../assets/global/global_asset";

export const LoginContainer = styled("div")(({ theme }) => ({
  border: "1px solid black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  width: "100%",
  background: `linear-gradient(rgba(225, 225, 225 ,0.6), rgba(225, 225, 225, 0.2)), url(${VAPE_BACKGROUND}) center`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));

export const LoginWrapper = styled("div")(({ theme }) => ({
  margin: "auto",
  border: "1px solid rgb(156 163 175)",
  boxShadow: "rgb(107 114 128) 0px 3px 6px, rgb(107 114 128) 0px 3px 6px",
  padding: "15px",
  backgroundColor: "white",
  width: "23%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6px",
  [theme.breakpoints.down("lg")]: {
    width: "30%",
  },
  [theme.breakpoints.down("md")]: {
    width: "43%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

export const LoginImage = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "10px",
}));

export const LoginImageItem = styled("img")(({ theme }) => ({
  width: "35px",
  height: "35px",
  borderRadius: "50%",
}));

export const LoginTitle = styled(Typography)(({ theme }) => ({
  letterSpacing: "2px",
  fontWeight: "600",
  fontSize: "24px",
  marginBottom: "15px",
}));

export const LoginForm = styled("form")(({ theme }) => ({
  width: "100%",
}));

export const LoginFiledGroup = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  margin: "0px 0 20px 0",
  width: "100%",
  position: "relative",
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  marginBottom: "5px",
}));

export const LoginError = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  margin: "0px 0 18px 0",
}));

export const LoginErrorMessage = styled("span")(({ theme }) => ({
  color: "#d32f2f",
  fontSize: "12px",
  letterSpacing: "0.5px",
  marginLeft: "14px",
  textTransform: "capitalize",
}));
