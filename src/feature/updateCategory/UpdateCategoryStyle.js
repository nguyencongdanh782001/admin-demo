import styled from "@emotion/styled";

export const NewBrandFormInputDescItem = styled("div")(({ theme }) => ({
  width: "100%",
  marginTop: "20px",
  "& .ck-editor__editable": {
    height: "400px",
  },
  "&.loading-page": {
    display: "none",
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "15px",
  },
  "& .blog-content": {
    minHeight: "500px",
    position: "relative",
  },
}));

export const UpdateBrandLoadingContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  marginTop: "10px",
}));

export const UpdateBrandLoadingGroup1 = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "start",
}));

export const UpdateBrandLoadingGroup1Item = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const UpdateBrandLoadingItem = styled("div")(({ theme }) => ({
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

export const UpdateBrandLoadingDesc = styled("div")(({ theme }) => ({
  width: "100%",
  height: "300px",
  margin: "15px 0 14px 0",
  "& .MuiSkeleton-root": {
    height: "300px",
  },
}));
