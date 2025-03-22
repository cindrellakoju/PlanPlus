import React, { useContext, useState, useEffect } from "react";
import "../styles/HomePage.css";
import SideBar from "../components/allrequire/SideBar";
import { MyContext } from "../context/Component.context";
import DisplayComponents from "../components/allrequire/DisplayComponents";
import { useNavigate } from "react-router-dom";
import Logout from "../components/notLogin/Logout";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  
  if (!context) {
    throw new Error("Homepage context must be within MyProvider");
  }

  const [displaySidebar, setSideBar] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false); // Edit mode state
  
  const toggleSidebar = () => {
    setSideBar((prevState) => !prevState);
  };

  const displayEditMode = () => {
    setIsEditMode(true); // Set edit mode to true
  };

  // If in edit mode, navigate to the edit page
  useEffect(() => {
    if (isEditMode) {
      navigate("/homepgedit");
    }
  }, [isEditMode, navigate]); // Ensure navigation is triggered when `isEditMode` changes

  // Retrieve and parse user detail from localStorage
  const storedUser = localStorage.getItem('userdetail');
  const [userInfo, setUserInfo] = useState<{ first_name: string; last_name: string } | null>(null);

  useEffect(() => {
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser); // Store parsed user info in state
    }
  }, [storedUser]);

  return (
    <div className="HomePage">
      {/* Sidebar Component */}
      <div className={`sidebar ${displaySidebar ? 'open' : 'closed'}`} style={{ width: displaySidebar ? "30%" : "0%"}}>
        {displaySidebar && <SideBar />}
      </div>

      {/* Main Content */}
      <div className="bodypart">
        <div className="iconBar">
          <i className="bx bx-list-ul" onClick={toggleSidebar}></i>
          <button onClick={displayEditMode}>Edit</button> {/* On click, trigger edit mode */}
        </div>
        <div className="body">
          {context.selectedComponents.length > 0 ? (
            <div className="displaycomponent">
              <DisplayComponents />
            </div>
          ) : (
            <>
              <h1>Welcome to PlanPlus {userInfo ? `${userInfo.first_name} ${userInfo.last_name}` : "Guest"}</h1>
              <p>
                Click <i className="bx bx-list-ul"></i> to add the required fields.
              </p>
              <Logout />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
