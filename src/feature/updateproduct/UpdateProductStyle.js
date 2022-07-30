import { styled } from "@mui/system";

export const UpdateProductLoadingContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10px",
}));

export const UpdateProductLoadingGroup1 = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "start",
}));
export const UpdateProductLoadingItem = styled("div")(({ theme }) => ({
  margin: "0px 15px 0px 0",
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

export const UpdateProductLoadingDesc = styled("div")(({ theme }) => ({
  width: "100%",
  height: "300px",
  marginTop: "10px",
  "& .MuiSkeleton-root": {
    height: "300px",
  },
}));

export const UpdateProductLoadingGroup2 = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  width: "100%",
}));

export const UpdateProductLoadingItem2 = styled("div")(({ theme }) => ({
  width: "210px",
  "& .MuiSkeleton-root": {
    height: "55px",
  },
}));

export const UpdateProductLoadingImage = styled("div")(({ theme }) => ({
  width: "90px",
  height: "143px",
  marginLeft: "15px",
  "& .MuiSkeleton-root": {
    height: "100%",
  },
}));

export const UpdateProductContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "start",
}));

export const UpdateProductTitle = styled("h1")(({ theme }) => ({
  fontSize: "24px",
  lineHeight: "30px",
  letterSpacing: "1px",
  color: "rgb(55 65 81)",
}));

export const UpdateProductForm = styled("form")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
  marginTop: "20px",
}));

export const UpdateProductInputGroup = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "start",
}));

export const UpdateProductInputItem = styled("div")(({ theme }) => ({
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

export const UpdateProductDescItem = styled("div")(({ theme }) => ({
  width: "100%",
  marginTop: "10px",
  "& .ck-editor__editable": {
    height: "250px",
  },
  "&.loading-page": {
    display: "none",
  },
}));

export const UpdateProductButtonGroup = styled("div")(({ theme }) => ({
  marginTop: "30px",
}));

export const UpdateProductImageGroup = styled("div")(({ theme }) => ({
  width: "100%",
  marginTop: "10px",
  display: "flex",
  alignItems: "start",
  "&.loading-page": {
    display: "none",
  },
}));

export const UpdateProductImageInputGroup = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
  marginBottom: "10px",
  "& .input-1": {
    marginBottom: "15px",
  },
}));

export const UpdateProductImageContainer = styled("div")(({ theme }) => ({
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

export const UpdateProductDropzoneImageContainer = styled("div")(
  ({ theme }) => ({
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
  })
);

export const UpdateProductDropzoneImage = styled("img")(({ theme }) => ({
  width: "105px",
  height: "105px",
  objectFit: "cover",
}));

export const UpdateProductDropzoneButton = styled("div")(({ theme }) => ({
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

export const UpdateProductImageBtnGroup = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: "5px",
}));
