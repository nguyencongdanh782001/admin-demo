import { Button } from "@mui/material";
import { styled } from "@mui/system";
export const DataGridTitle = styled("h1")(({ theme }) => ({
  textTransform: "uppercase",
  marginBottom: "15px",
  color: "rgb(55 65 81)",
  fontWeight: "600",
  fontSize: "24px",
}));

export const NewSearchForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
  flexWrap: "wrap",
  marginBottom: "40px",
}));

export const NewSearchFormInputGroup = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "start",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  "& .MuiFormControl-root": {
    marginRight: "15px",

    [theme.breakpoints.down("sm")]: {
      marginRight: "0",
      marginBottom: "15px",
      width: "100%",
    },
  },
}));

export const NewSearchFormButtonGroup = styled("div")(({ theme }) => ({
  marginTop: "15px",
}));

export const NewSearchFormButton = styled(Button)(({ theme }) => ({}));

export const NewSearchNameGroup = styled("div")(({ theme }) => ({
  width: "100%",
  marginTop: "10px",
  display: "flex",
  alignItems: "start",
}));

export const NewSearchNameInputGroup = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
  marginBottom: "10px",
  "& .input-1": {
    marginBottom: "5px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const NewSearchInputItem = styled("div")(({ theme }) => ({
  margin: "10px 20px 10px 0px",
  width: "280px",
  [theme.breakpoints.down("md")]: {
    width: "230px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginRight: "0",
  },
}));

export const NewSearchNameBtnGroup = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: "5px",
}));

export const NewSearchFormInputDescItem = styled("div")(({ theme }) => ({
  width: "100%",
  marginTop: "10px",
  "& .ck-editor__editable": {
    height: "250px",
  },
  "&.loading-page": {
    display: "none",
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "15px",
  },
}));
