import { styled } from "@mui/system";

export const ImageContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const ImageProduct = styled("img")(({ theme }) => ({
  objectFit: "contain",
  width: "45px",
  height: "45px",
  borderRadius: "50%",
}));

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
