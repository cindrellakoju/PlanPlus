import React, { useState } from "react";
import "../styles/HomePage.css";
import SideBar from "../components/allrequire/SideBar";

const HomePage: React.FC = () => {
  const [displaySidebar, setSideBar] = useState<boolean>(false);

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setSideBar((prevState) => !prevState);
  };

  return (
    <div className="HomePage">
        <div className="sidebar" style={{
             display: displaySidebar ? "block" : "none",
            width: displaySidebar ? "30%" : "0%"    
        }} >
            {displaySidebar && <SideBar />}
        </div>
        <div className="bodypart">
            <div className="iconBar" onClick={toggleSidebar}>
                <i className="bx bx-list-ul"></i>
            </div>
            <div className="body">
                <h1>Welcome to PlanPlus Cinderella</h1>
                <p>
                Click <i className="bx bx-list-ul"></i> to add the required fields.
                </p>
            </div>
        </div>
    </div>
  );
};

export default HomePage;
