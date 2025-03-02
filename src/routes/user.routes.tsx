import React from "react";
import { BrowserRouter , createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import HomePageEdit from "../pages/HomePageEdit";
import AppPage from "../pages/AppPage";

const routes = createBrowserRouter([
    { path: "/", element: <AppPage/> },
    {  path: "/homepgedit", element: <HomePageEdit /> }
]);

const UserRoute: React.FC = () => {
    return (
        <RouterProvider router={routes}/>
    )
    // return (
    //     <BrowserRouter>
    //         <Routes>
    //             {routes.map((route, index) => (
    //                 <Route key={index} path={route.path} element={route.element} />
    //             ))}
    //         </Routes>
    //     </BrowserRouter>
    // );
};

export default UserRoute;
