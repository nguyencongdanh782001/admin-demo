import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";

export const DataGridContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "30px",
}));

export const DataGridGroup = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
  marginBottom: "30px",
  width: "100%",
}));

export const DataGridTitle = styled("h1")(({ theme }) => ({
  textTransform: "uppercase",
  marginBottom: "15px",
  color: "rgb(55 65 81)",
  fontWeight: "600",
  fontSize: "24px",
}));

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",

  padding: "15px 10px 8px 20px",
  borderRadius: "6px",
}));

export const ModalWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
}));

export const ModalHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
}));

export const ModalTitle = styled("h1")(({ theme }) => ({
  fontSize: "1.25rem",
  lineHeight: "1.6",
  letterSpacing: "0.0075rem",
  textTransform: "capitalize",
}));

export const ModalContent = styled("div")(({ theme }) => ({}));

export const ModalForm = styled("form")(({ theme }) => ({
  width: "300px",
}));

export const ModalFormButtonGroup = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: "30px",
}));

export const ModalFormButton = styled(Button)(({ theme }) => ({}));

export const CatForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
  flexWrap: "wrap",
  marginBottom: "40px",
}));

export const CatFormInputGroup = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  "& .MuiFormControl-root": {
    marginRight: "15px",

    [theme.breakpoints.down("sm")]: {
      marginRight: "0",
      marginBottom: "15px",
      width: "100%",
    },
  },
}));

export const CatFormButtonGroup = styled("div")(({ theme }) => ({
  marginTop: "15px",
}));

export const CatFormButton = styled(Button)(({ theme }) => ({}));
