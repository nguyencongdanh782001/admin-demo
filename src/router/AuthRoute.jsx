import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingPage from "../components/loadingpage/LoadingPage";

const AuthRoute = ({ children }) => {
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : error === "" ? (
        currentUser.isAdmin ? (
          <Navigate to="/" />
        ) : (
          children
        )
      ) : (
        children
      )}
    </div>
  );
};

export default AuthRoute;
