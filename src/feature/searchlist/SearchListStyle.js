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
