import { Button } from "@mui/material";
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

export const BannerForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
  flexWrap: "wrap",
  marginBottom: "40px",
}));

export const BannerFormInputGroup = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
  "& .MuiFormControl-root": {
    marginBottom: "15px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export const BannerFormButtonGroup = styled("div")(({ theme }) => ({
  marginTop: "15px",
}));

export const BannerFormButton = styled(Button)(({ theme }) => ({}));

export const BannerDropZoneContainer = styled("div")(({ theme }) => ({
  border: "1px dashed gray",
  borderRadius: "8px",
  height: "200px",
  width: "400px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  "&.image, &.image.error": {
    border: "1px solid gray",
    color: "black",
  },
  "&.error": {
    border: "1px dashed #d32f2f",
    color: "#d32f2f",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const BannerDropZoneImgContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "0",
  left: "0",
  bottom: "0",
  right: "0",
}));

export const BannerDropZoneImg = styled("img")(({ theme }) => ({
  objectFit: "cover",
  height: "200px",
  width: "400px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const BannerDropZoneButton = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "5px",
  right: "5px",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  padding: "1px",
  cursor: "pointer",
  zIndex: "20",
  opacity: "0.5",
  transition: "0.3s",
  "&:hover": {
    opacity: "0.8",
  },
}));

export const BannerErrorMessage = styled("span")(({ theme }) => ({
  color: "#d32f2f",
  fontSize: "13px",
  letterSpacing: "0.5px",
  textTransform: "capitalize",
  marginLeft: "5px",
  marginBottom: "5px",
}));

export const DataGridImgContainer = styled("div")(({ theme }) => ({
  width: "150px",
}));

export const DataGridImg = styled("img")(({ theme }) => ({
  width: "150px",
  objectFit: "cover",
}));
