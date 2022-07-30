import { styled } from "@mui/system";

export const NewProductContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "start",
}));

export const NewProductTitle = styled("h1")(({ theme }) => ({
  fontSize: "24px",
  lineHeight: "30px",
  letterSpacing: "1px",
  color: "rgb(55 65 81)",
}));

export const NewProductForm = styled("form")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
  marginTop: "20px",
}));

export const NewProductInputGroup = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "start",
}));

export const NewProductInputItem = styled("div")(({ theme }) => ({
  margin: "10px 15px 10px 0",
  width: "280px",
  [theme.breakpoints.down("md")]: {
    width: "230px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginRight: "0",
  },
}));

export const NewProductDescItem = styled("div")(({ theme }) => ({
  width: "100%",
  marginTop: "10px",
  "& .ck-editor__editable": {
    height: "250px",
  },
}));

export const NewProductButtonGroup = styled("div")(({ theme }) => ({
  marginTop: "30px",
}));

export const NewProductImageGroup = styled("div")(({ theme }) => ({
  width: "100%",
  marginTop: "10px",
  display: "flex",
  alignItems: "start",
}));

export const NewProductImageInputGroup = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
  marginBottom: "10px",
  "& .input-1": {
    marginBottom: "15px",
  },
}));

export const NewProductImageContainer = styled("div")(({ theme }) => ({
  position: "relative",
  width: "105px",
  height: "105px",
  border: "1px dashed rgb(156 163 175)",
  borderRadius: "5px",
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  transition: "0.2s",
  overflow: "hidden",
  "&:hover": {
    backgroundColor: "rgb(243 244 246)",
    color: "rgb(31 41 55)",
  },
  "&.image, &.image.error": {
    border: "1px solid rgb(156 163 175)",
    color: "rgb(31 41 55)",
  },
  "&.error": {
    borderColor: "#d32f2f",
    color: "#d32f2f",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: "15px",
  },
}));

export const NewProductDropzoneImageContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "0",
  left: "0",
  bottom: "0",
  right: "0",
}));

export const NewProductDropzoneImage = styled("img")(({ theme }) => ({
  width: "105px",
  height: "105px",
  objectFit: "cover",
}));

export const NewProductDropzoneButton = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "3px",
  right: "3px",
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

export const NewProductImageBtnGroup = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: "5px",
}));
