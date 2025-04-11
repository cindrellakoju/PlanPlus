import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { MyProvider } from "../context/Component.context";
import LoginPage from "../components/notLogin/LoginPage";
import SignUpPage from "../components/notLogin/SignUpPage";
import CreateTable from "../components/allrequire/CreateTable";
import Selecttheme from "../test/Selecttheme";
import { ThemeProvider } from "../context/Theme.context";
import MainPage from "../pages/MainPage";
import EditPage from "../pages/EditPage";
import { EditThemeProvider } from "../context/EditThemeContext";

// Create a PrivateRoute component to protect routes
const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const token = localStorage.getItem('sessionToken') || sessionStorage.getItem('sessionToken');
  
  // Check if there's a token, if yes, allow access, otherwise redirect to login page
  return token ? <>{element}</> : <Navigate to="/login" replace />;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<MainPage />} /> // Protect homepage
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
  },
  {
    path: "/editpage",
    element: <PrivateRoute element={<EditPage/>}/>
  },
]);

const UserRoute: React.FC = () => {
  return (
    <EditThemeProvider>
      <ThemeProvider>
        <MyProvider>
          <RouterProvider router={routes} />
        </MyProvider>
      </ThemeProvider>
    </EditThemeProvider>
  );
};

export default UserRoute;
