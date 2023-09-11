import { Outlet } from "react-router-dom";
import Sidebar from "../../containers/SideBar";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="HomePage">
      <div className="HomePage__sidebar">
        <Sidebar />
      </div>
      <div className="HomePage__outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
