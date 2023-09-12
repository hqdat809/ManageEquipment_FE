import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { useLocation, useNavigate } from "react-router-dom";
import * as routePath from "../routes/paths";
import "./SideBar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
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
      {tabs.map((tab, key) => renderSidebarItem(tab, key))}
    </div>
  );
};

export default Sidebar;
