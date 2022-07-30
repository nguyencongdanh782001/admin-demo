import {
  AccountCircleOutlined,
  AddShoppingCartOutlined,
  AddToHomeScreenOutlined,
  AdUnitsOutlined,
  BookmarkBorderOutlined,
  CategoryOutlined,
  ContentPasteSearchOutlined,
  LocalMallOutlined,
  LogoutOutlined,
  Menu,
} from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../feature/reduxSlice/authSlice";
import {
  NavbarContainer,
  NavBarDrawer,
  NavBarDrawerMenuItem,
  NavBarDrawerMenuItemTitle,
  NavBarDrawerMenuItemTitleLink,
  NavBarDrawerMenuLink,
  NavBarDrawerMenuLinkIcon,
  NavBarDrawerMenuLinkText,
  NavBarDrawerMenuList,
  NavbarToggle,
  NavbarWrapper,
  UserButton,
  UserMenu,
  UserMenuItem,
  UserMenuItemIcon,
  UserMenuItemText,
} from "./NavBarMobileStyle";

const NavBarMobile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [openUserOption, setOpenUserOption] = React.useState(null);
  const open = Boolean(openUserOption);
  const handleClickUserOption = (event) => {
    setOpenUserOption(event.currentTarget);
  };
  const handleCloseUserOption = () => {
    setOpenUserOption(null);
  };

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      setOpenUserOption(null);
      window.location.reload();
    } catch (error) {}
  };

  return (
    <NavbarContainer color="inherit">
      <NavbarWrapper>
        <NavbarToggle
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <Menu sx={{ fontSize: "30px" }} />
        </NavbarToggle>
        <NavBarDrawer
          anchor="left"
          open={openDrawer}
          onClose={toggleDrawer(false)}
        >
          <NavBarDrawerMenuList>
            <NavBarDrawerMenuItemTitle>
              <NavBarDrawerMenuItemTitleLink to="/">
                crew vape
              </NavBarDrawerMenuItemTitleLink>
            </NavBarDrawerMenuItemTitle>
            <NavBarDrawerMenuItem>
              <NavBarDrawerMenuLink to="/">
                <NavBarDrawerMenuLinkIcon>
                  <LocalMallOutlined fontSize="medium" />
                </NavBarDrawerMenuLinkIcon>
                <NavBarDrawerMenuLinkText>Sản phẩm</NavBarDrawerMenuLinkText>
              </NavBarDrawerMenuLink>
            </NavBarDrawerMenuItem>

            <NavBarDrawerMenuItem>
              <NavBarDrawerMenuLink to="/san-pham-moi">
                <NavBarDrawerMenuLinkIcon>
                  <AddShoppingCartOutlined fontSize="medium" />
                </NavBarDrawerMenuLinkIcon>
                <NavBarDrawerMenuLinkText>
                  Thêm sản phẩm
                </NavBarDrawerMenuLinkText>
              </NavBarDrawerMenuLink>
            </NavBarDrawerMenuItem>

            <NavBarDrawerMenuItem>
              <NavBarDrawerMenuLink to="/loai-san-pham">
                <NavBarDrawerMenuLinkIcon>
                  <CategoryOutlined fontSize="medium" />
                </NavBarDrawerMenuLinkIcon>
                <NavBarDrawerMenuLinkText>
                  Loại sản phẩm
                </NavBarDrawerMenuLinkText>
              </NavBarDrawerMenuLink>
            </NavBarDrawerMenuItem>

            <NavBarDrawerMenuItem>
              <NavBarDrawerMenuLink to="/thuong-hieu">
                <NavBarDrawerMenuLinkIcon>
                  <AdUnitsOutlined fontSize="medium" />
                </NavBarDrawerMenuLinkIcon>
                <NavBarDrawerMenuLinkText>Thương hiệu</NavBarDrawerMenuLinkText>
              </NavBarDrawerMenuLink>
            </NavBarDrawerMenuItem>

            <NavBarDrawerMenuItem>
              <NavBarDrawerMenuLink to="/anh-bia">
                <NavBarDrawerMenuLinkIcon>
                  <BookmarkBorderOutlined fontSize="medium" />
                </NavBarDrawerMenuLinkIcon>
                <NavBarDrawerMenuLinkText>Ảnh bìa</NavBarDrawerMenuLinkText>
              </NavBarDrawerMenuLink>
            </NavBarDrawerMenuItem>

            <NavBarDrawerMenuItem>
              <NavBarDrawerMenuLink to="/anh-bia-dien-thoai">
                <NavBarDrawerMenuLinkIcon>
                  <AddToHomeScreenOutlined fontSize="medium" />
                </NavBarDrawerMenuLinkIcon>
                <NavBarDrawerMenuLinkText>
                  Ảnh bìa điện thoại
                </NavBarDrawerMenuLinkText>
              </NavBarDrawerMenuLink>
            </NavBarDrawerMenuItem>

            <NavBarDrawerMenuItem>
              <NavBarDrawerMenuLink to="/danh-sach-tim-kiem">
                <NavBarDrawerMenuLinkIcon>
                  <ContentPasteSearchOutlined fontSize="medium" />
                </NavBarDrawerMenuLinkIcon>
                <NavBarDrawerMenuLinkText>
                  Danh sách tìm kiếm
                </NavBarDrawerMenuLinkText>
              </NavBarDrawerMenuLink>
            </NavBarDrawerMenuItem>

            <NavBarDrawerMenuItem>
              <NavBarDrawerMenuLink to="/nguoi-dung">
                <NavBarDrawerMenuLinkIcon>
                  <AccountCircleOutlined fontSize="medium" />
                </NavBarDrawerMenuLinkIcon>
                <NavBarDrawerMenuLinkText>Người dùng</NavBarDrawerMenuLinkText>
              </NavBarDrawerMenuLink>
            </NavBarDrawerMenuItem>
          </NavBarDrawerMenuList>
        </NavBarDrawer>

        <UserButton
          variant="outlined"
          color="primary"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickUserOption}
        >
          {currentUser.username}
        </UserButton>
        <UserMenu
          id="basic-menu"
          anchorEl={openUserOption}
          open={open}
          onClose={handleCloseUserOption}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <UserMenuItem onClick={handleLogout}>
            <UserMenuItemIcon>
              <LogoutOutlined sx={{ color: "red" }} />
            </UserMenuItemIcon>
            <UserMenuItemText>Đăng xuất</UserMenuItemText>
          </UserMenuItem>
        </UserMenu>
      </NavbarWrapper>
    </NavbarContainer>
  );
};

export default NavBarMobile;
