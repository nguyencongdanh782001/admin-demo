import React from "react";
import {
  CategoryContainer,
  CategoryItemLink,
  CategoryItemLinkIcon,
  CategoryItemLinkText,
  CategoryList,
  CategoryWrapper,
} from "./CategoryStyle";
const Category = () => {
  return (
    <CategoryContainer>
      <CategoryWrapper>
        <CategoryList>
          <CategoryItemLink
            to="/san-pham"
            style={{ backgroundColor: "rgb(251 191 36)" }}
          >
            <CategoryItemLinkIcon></CategoryItemLinkIcon>
            <CategoryItemLinkText>Sản phẩm</CategoryItemLinkText>
          </CategoryItemLink>
          <CategoryItemLink
            to="/loai-san-pham"
            style={{ backgroundColor: "rgb(34 211 238)" }}
          >
            <CategoryItemLinkIcon></CategoryItemLinkIcon>
            <CategoryItemLinkText>Loại sản phẩm</CategoryItemLinkText>
          </CategoryItemLink>
          <CategoryItemLink
            to="/thuong-hieu"
            style={{ backgroundColor: "rgb(232 121 249)" }}
          >
            <CategoryItemLinkIcon></CategoryItemLinkIcon>
            <CategoryItemLinkText>Thương hiệu</CategoryItemLinkText>
          </CategoryItemLink>
          <CategoryItemLink
            to="/anh-bia"
            style={{ backgroundColor: "rgb(244 114 182)" }}
          >
            <CategoryItemLinkIcon></CategoryItemLinkIcon>
            <CategoryItemLinkText>Ảnh bìa</CategoryItemLinkText>
          </CategoryItemLink>
        </CategoryList>
      </CategoryWrapper>
    </CategoryContainer>
  );
};

export default Category;
