import React from "react";
import "./LoadingPage.css";
const LoadingPage = () => {
  return (
    <div className="body">
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <span>Loading</span>
      </div>
    </div>
  );
};

export default LoadingPage;
