import { LogoutOutlined, Menu } from "@mui/icons-material";
import { FormControlLabel } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../feature/reduxSlice/authSlice";
import {
  MaterialUISwitch,
  NavbarContainer,
  NavbarToggle,
  NavbarWrapper,
  UserButton,
  UserMenu,
  UserMenuItem,
  UserMenuItemIcon,
  UserMenuItemText,
} from "./NavBarPcStyle";

const NavBarPc = ({ handleToggleClick }) => {
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
          onClick={handleToggleClick}
        >
          <Menu sx={{ fontSize: "30px" }} />
        </NavbarToggle>
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
          <UserMenuItem>
            <FormControlLabel
              control={
                <MaterialUISwitch
                  sx={{ m: 1 }}
                  // checked={darkMode}
                  // onChange={darkModeHandle}
                />
              }
              label=""
            />
          </UserMenuItem>
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

export default NavBarPc;
