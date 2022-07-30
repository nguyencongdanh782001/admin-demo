import { styled } from "@mui/system";
import { Link } from "react-router-dom";

export const CategoryContainer = styled("div")(({ theme }) => ({
  width: "100%",
}));

export const CategoryWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const CategoryList = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  flexWrap: "wrap",
}));

export const CategoryItemLink = styled(Link)(({ theme }) => ({
  height: "100px",
  width: "200px",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "50px 15px 10px 15px",
  borderRadius: "10px",
  textDecoration: "none",
  color: "black",
  boxShadow: "rgba(0, 0, 0, 0.24) 4px 3px 7px",
  transition: "transform 0.3s ease-in-out",
  backgroundColor: "cyan",
  "&:hover": {
    transform: "translateY(-10px)",
  },
}));

export const CategoryItemLinkIcon = styled("span")(({ theme }) => ({}));

export const CategoryItemLinkText = styled("span")(({ theme }) => ({}));
