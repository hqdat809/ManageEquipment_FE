import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as RoutePaths from "./paths";
import { useSelector } from "react-redux";
import { TRootState } from "../stores/reducers";

const SignIn = React.lazy(() => import("../pages/auth/SignIn"));
const ViewPage = React.lazy(() => import("../pages/views/ViewPage"));
const HomePage = React.lazy(() => import("../pages/homepage/HomePage"));
const UserPage = React.lazy(() => import("../pages/user/UserPage"));
const EquipmentPage = React.lazy(() => import("../pages/equipment/Equipment"));

const Routes = () => {
  const userData = useSelector((state: TRootState) => state.authUser.userData);
  const adminRouter = createBrowserRouter([
    {
      element: <SignIn />,
      path: "*",
    },
    {
      element: <SignIn />,
      path: RoutePaths.SIGNIN,
    },
    {
      element: <HomePage />,
      children: [
        { path: RoutePaths.EQUIPMENT, element: <EquipmentPage /> },
        { path: RoutePaths.USER, element: <UserPage /> },
      ],
    },
  ]);

  const userRouter = createBrowserRouter([
    {
      element: <SignIn />,
      path: "*",
    },
    {
      element: <SignIn />,
      path: RoutePaths.SIGNIN,
    },
    {
      element: <HomePage />,
      children: [{ path: RoutePaths.EQUIPMENT, element: <EquipmentPage /> }],
    },
  ]);

  return (
    <React.StrictMode>
      <Suspense>
        <RouterProvider
          router={userData?.role.name === "ADMIN" ? adminRouter : userRouter}
        />
      </Suspense>
    </React.StrictMode>
  );
};

export default Routes;
