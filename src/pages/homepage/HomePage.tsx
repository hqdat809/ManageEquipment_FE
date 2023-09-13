import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../containers/SideBar";
import "./HomePage.scss";
import * as RoutePaths from "../../routes/paths";
import { EAuthToken } from "../../interfaces/user-interfaces";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Avatar, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useSelector } from "react-redux";
import { toastInfo } from "../../utils/notifications-utils";
import { TRootState } from "../../stores/reducers";

const HomePage = () => {
  const userData = useSelector((state: TRootState) => state.authUser.userData);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (!localStorage.getItem(EAuthToken.ACCESS_TOKEN)) {
    return <Navigate to={RoutePaths.SIGNIN} replace />;
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFeatureNotAvailable = () => {
    toastInfo("This feature will be available in the future");
    handleClose();
  };

  const handleClickUser = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem(EAuthToken.ACCESS_TOKEN);
    localStorage.removeItem(EAuthToken.REFRESH_TOKEN);
    localStorage.removeItem("persist:root");
    handleClose();
    window.location.href = RoutePaths.SIGNIN;
  };

  return (
    <div className="HomePage">
      <div className="HomePage__sidebar">
        <Sidebar />
      </div>
      <div className="HomePage__outlet">
        <div className="HomePage__outlet-actions">
          <div>
            <div
              className="HomePage__outlet-user"
              onClick={(e) => handleClickUser(e)}
            >
              <Avatar
                alt="hqdat"
                src="/src/assets/img/avatar.png"
                sx={{ width: "32px", height: "32px" }}
              />
              <div className="HomePage__outlet-user-name">
                {userData?.firstName} {userData?.lastName}
                <KeyboardArrowDownRoundedIcon />
              </div>
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              style={{ right: "28px" }}
            >
              <MenuItem
                onClick={handleFeatureNotAvailable}
                className="Navbar__menu-item"
              >
                <PersonOutlineOutlinedIcon /> My account
              </MenuItem>
              <MenuItem
                onClick={handleFeatureNotAvailable}
                className="Navbar__menu-item"
              >
                <SettingsIcon /> Settings
              </MenuItem>
              <MenuItem onClick={handleLogout} className="Navbar__menu-item">
                <LogoutIcon />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="HomePage__outlet-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
