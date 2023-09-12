import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as RoutePaths from "./paths";

const SignIn = React.lazy(() => import("../pages/auth/SignIn"));
const ViewPage = React.lazy(() => import("../pages/views/ViewPage"));
const HomePage = React.lazy(() => import("../pages/homepage/HomePage"));
const UserPage = React.lazy(() => import("../pages/user/UserPage"));
const EquipmentPage = React.lazy(() => import("../pages/equipment/Equipment"));

const Routes = () => {
  const router = createBrowserRouter([
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

  return (
    <React.StrictMode>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </React.StrictMode>
  );
};

export default Routes;
