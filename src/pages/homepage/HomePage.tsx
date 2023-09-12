import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../containers/SideBar";
import "./HomePage.scss";
import * as RoutePaths from "../../routes/paths";
import { EAuthToken } from "../../interfaces/user-interfaces";

const HomePage = () => {
  if (!localStorage.getItem(EAuthToken.ACCESS_TOKEN)) {
    return <Navigate to={RoutePaths.SIGNIN} replace />;
  }
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
