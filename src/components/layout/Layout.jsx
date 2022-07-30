import React, { useState } from "react";
import NavBar from "../navbar/NavBar";
import SideBar from "../sidebar/SideBar";
import {
  LayoutContainer,
  LayoutLeft,
  LayoutRight,
  LayoutRightContainer,
} from "./LayoutStyle";

const PCLayout = ({ children }) => {
  const [toggleActive, setToggleActive] = useState(false);

  const handleToggleClick = () => {
    setToggleActive((prev) => !prev);
  };
  return (
    <LayoutContainer>
      <LayoutLeft className={`${toggleActive && "actvie"}`}>
        <SideBar />
      </LayoutLeft>
      <LayoutRight className={`${toggleActive && "actvie"}`}>
        <NavBar handleToggleClick={handleToggleClick} />
        <LayoutRightContainer>{children}</LayoutRightContainer>
      </LayoutRight>
    </LayoutContainer>
  );
};

export default PCLayout;
