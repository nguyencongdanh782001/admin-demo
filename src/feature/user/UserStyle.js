import { styled } from "@mui/system";

export const UserContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "start",
}));

export const UserTitle = styled("h1")(({ theme }) => ({
  width: "100%",
  marginBottom: "25px",
  color: "rgb(55 65 81)",
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
  },
}));

export const UserForm = styled("form")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
  flexDirection: "column",
  marginBottom: "25px",
}));

export const UserFormTitle = styled("h3")(({ theme }) => ({
  marginBottom: "13px",
  letterSpacing: "0.5px",
  fontSize: "18px",
  color: "rgb(55 65 81)",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "15px",
  },
}));

export const UserInputItemGroup = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
  flexWrap: "wrap",
  width: "100%",
}));

export const UserInputItem = styled("div")(({ theme }) => ({
  width: "280px",
  [theme.breakpoints.down("md")]: {
    width: "230px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginRight: "0",
  },
}));

export const UserButtonGroup = styled("div")(({ theme }) => ({
  marginLeft: "15px",

  [theme.breakpoints.down("sm")]: {
    marginLeft: "0",
    marginTop: "10px",
  },
}));

export const UserLoadingContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
  flexDirection: "column",
  marginBottom: "25px",
}));

export const UserLoadingTitle = styled("h3")(({ theme }) => ({
  letterSpacing: "0.5px",
  fontSize: "18px",
  color: "rgb(55 65 81)",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "15px",
  },
}));

export const UserLoadingInputItemGroup = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
  flexWrap: "wrap",
  width: "100%",
}));

export const UserLoadingInputItem = styled("div")(({ theme }) => ({
  width: "280px",
  height: "55px",
  "& .MuiSkeleton-root": {
    height: "100%",
  },
  [theme.breakpoints.down("md")]: {
    width: "230px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginRight: "0",
  },
}));
