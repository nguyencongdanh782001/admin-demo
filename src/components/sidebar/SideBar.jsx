import {
  AccountCircleOutlined,
  AddShoppingCartOutlined,
  AddToHomeScreenOutlined,
  AdUnitsOutlined,
  BookmarkBorderOutlined,
  CategoryOutlined,
  ContentPasteSearchOutlined,
  FilterNoneOutlined,
  Home,
  LocalMallOutlined,
} from "@mui/icons-material";
import React from "react";
import {
  SideBarContainer,
  SideBarLogo,
  SideBarLogoIcon,
  SideBarLogoText,
  SideBarMenuItem,
  SideBarMenuLink,
  SideBarMenuLinkIcon,
  SideBarMenuLinkText,
  SideBarMenuList,
} from "./SideBarStyle";

const SideBar = () => {
  return (
    <SideBarContainer>
      <SideBarLogo to="/">
        <SideBarLogoIcon>
          <Home fontSize="medium" />
        </SideBarLogoIcon>
        <SideBarLogoText>Crew Vape</SideBarLogoText>
      </SideBarLogo>
      <SideBarMenuList>
        <SideBarMenuItem>
          <SideBarMenuLink to="/">
            <SideBarMenuLinkIcon>
              <LocalMallOutlined fontSize="medium" />
            </SideBarMenuLinkIcon>
            <SideBarMenuLinkText>Sản phẩm</SideBarMenuLinkText>
          </SideBarMenuLink>
        </SideBarMenuItem>
        <SideBarMenuItem>
          <SideBarMenuLink to="/san-pham-moi">
            <SideBarMenuLinkIcon>
              <AddShoppingCartOutlined fontSize="medium" />
            </SideBarMenuLinkIcon>
            <SideBarMenuLinkText>Thêm sản phẩm</SideBarMenuLinkText>
          </SideBarMenuLink>
        </SideBarMenuItem>
        <SideBarMenuItem>
          <SideBarMenuLink to="/loai-san-pham">
            <SideBarMenuLinkIcon>
              <CategoryOutlined fontSize="medium" />
            </SideBarMenuLinkIcon>
            <SideBarMenuLinkText>Loại sản phẩm</SideBarMenuLinkText>
          </SideBarMenuLink>
        </SideBarMenuItem>
        <SideBarMenuItem>
          <SideBarMenuLink to="/loai-san-pham-noi-bat">
            <SideBarMenuLinkIcon>
              <FilterNoneOutlined fontSize="medium" />
            </SideBarMenuLinkIcon>
            <SideBarMenuLinkText>Loại sản phẩm nổi bật</SideBarMenuLinkText>
          </SideBarMenuLink>
        </SideBarMenuItem>
        <SideBarMenuItem>
          <SideBarMenuLink to="/thuong-hieu">
            <SideBarMenuLinkIcon>
              <AdUnitsOutlined fontSize="medium" />
            </SideBarMenuLinkIcon>
            <SideBarMenuLinkText>Thương hiệu</SideBarMenuLinkText>
          </SideBarMenuLink>
        </SideBarMenuItem>
        <SideBarMenuItem>
          <SideBarMenuLink to="/anh-bia">
            <SideBarMenuLinkIcon>
              <BookmarkBorderOutlined fontSize="medium" />
            </SideBarMenuLinkIcon>
            <SideBarMenuLinkText>Ảnh bìa</SideBarMenuLinkText>
          </SideBarMenuLink>
        </SideBarMenuItem>
        <SideBarMenuItem>
          <SideBarMenuLink to="/anh-bia-dien-thoai">
            <SideBarMenuLinkIcon>
              <AddToHomeScreenOutlined fontSize="medium" />
            </SideBarMenuLinkIcon>
            <SideBarMenuLinkText>Ảnh bìa điện thoại</SideBarMenuLinkText>
          </SideBarMenuLink>
        </SideBarMenuItem>
        <SideBarMenuItem>
          <SideBarMenuLink to="/danh-sach-tim-kiem">
            <SideBarMenuLinkIcon>
              <ContentPasteSearchOutlined fontSize="medium" />
            </SideBarMenuLinkIcon>
            <SideBarMenuLinkText>Danh sách tìm kiếm</SideBarMenuLinkText>
          </SideBarMenuLink>
        </SideBarMenuItem>
        <SideBarMenuItem>
          <SideBarMenuLink to="/nguoi-dung">
            <SideBarMenuLinkIcon>
              <AccountCircleOutlined fontSize="medium" />
            </SideBarMenuLinkIcon>
            <SideBarMenuLinkText>Người dùng</SideBarMenuLinkText>
          </SideBarMenuLink>
        </SideBarMenuItem>
      </SideBarMenuList>
    </SideBarContainer>
  );
};

export default SideBar;
