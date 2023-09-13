import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { useLocation, useNavigate } from "react-router-dom";
import * as routePath from "../routes/paths";
import "./SideBar.scss";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { TRootState } from "../stores/reducers";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state: TRootState) => state.authUser.userData);

  const adminTabs = [
    {
      label: (
        <div
          className={`Sidebar__item-wrapper ${
            location.pathname === routePath.USER && "Sidebar__item-active"
          }`}
        >
          <SchoolRoundedIcon /> User
        </div>
      ),
      route: routePath.USER,
    },
    {
      label: (
        <div
          className={`Sidebar__item-wrapper ${
            location.pathname === routePath.EQUIPMENT && "Sidebar__item-active"
          }`}
        >
          <SchoolRoundedIcon /> Equipment
        </div>
      ),
      route: routePath.EQUIPMENT,
    },
  ];

  const userTabs = [
    {
      label: (
        <div
          className={`Sidebar__item-wrapper ${
            location.pathname === routePath.EQUIPMENT && "Sidebar__item-active"
          }`}
        >
          <SchoolRoundedIcon /> Equipment
        </div>
      ),
      route: routePath.EQUIPMENT,
    },
  ];

  const renderSidebarItem = (
    data: { label: JSX.Element; route: string },
    key: number
  ) => {
    const { label, route } = data;

    return (
      <div
        key={key}
        onClick={() => navigate(route, { replace: true })}
        className="Sidebar__item"
      >
        {label}
      </div>
    );
  };
  return (
    <div className="Sidebar">
      <div className="Sidebar__user">
        <div className="Sidebar__avt">
          <Avatar
            alt="hqdat"
            src="/src/assets/img/avatar.png"
            sx={{ width: "64px", height: "64px" }}
          />
        </div>
        <div className="Sidebar__name">
          {userData?.firstName} {userData?.lastName}
        </div>
        <div className="Sidebar__role">{userData?.roles[0].name}</div>
      </div>
      <div className="divider"></div>
      {userData?.roles[0].name === "ADMIN"
        ? adminTabs.map((tab, key) => renderSidebarItem(tab, key))
        : userTabs.map((tab, key) => renderSidebarItem(tab, key))}
    </div>
  );
};

export default Sidebar;
