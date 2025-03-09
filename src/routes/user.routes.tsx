import React from "react";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import AppPage from "../pages/AppPage";
import FrontPageEdit from "../pages/FrontPageEdit";
import { MyProvider } from "../context/Component.context";
import LoginPage from "../components/notLogin/LoginPage";

const routes = createBrowserRouter([
    { path: "/", element: <AppPage/> },
    {  path: "/homepgedit", element: <FrontPageEdit /> },
    { path:"/login", element: <LoginPage/> }
]);

const UserRoute: React.FC = () => {
    return (
        <MyProvider>
            <RouterProvider router={routes}/>
        </MyProvider>
    )
};

export default UserRoute;
