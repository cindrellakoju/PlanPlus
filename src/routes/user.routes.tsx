import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import AppPage from "../pages/AppPage";
import FrontPageEdit from "../pages/FrontPageEdit";
import { MyProvider } from "../context/Component.context";
import LoginPage from "../components/notLogin/LoginPage";
import SignUpPage from "../components/notLogin/SignUpPage";
import CreateTable from "../components/allrequire/CreateTable";

// Create a PrivateRoute component to protect routes
const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const token = localStorage.getItem('sessionToken') || sessionStorage.getItem('sessionToken');
  
  // Check if there's a token, if yes, allow access, otherwise redirect to login page
  return token ? <>{element}</> : <Navigate to="/login" replace />;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<AppPage />} /> // Protect homepage
  },
  {
    path: "/homepgedit",
    element: <PrivateRoute element={<FrontPageEdit />} /> // Protect homepage
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignUpPage />
  },
  {
    path: "/createtable",
    element: <PrivateRoute element={<CreateTable />} /> // Protect create table page
  }
]);

const UserRoute: React.FC = () => {
  return (
    <MyProvider>
      <RouterProvider router={routes} />
    </MyProvider>
  );
};

export default UserRoute;
