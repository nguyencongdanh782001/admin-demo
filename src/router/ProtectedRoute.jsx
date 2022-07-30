import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingPage from "../components/loadingpage/LoadingPage";

const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : error === "" ? (
        currentUser.isAdmin === true ? (
          children
        ) : (
          <Navigate to="/login" />
        )
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRoute;
