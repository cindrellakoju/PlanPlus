import React, { useState, useEffect, useContext } from "react";
import "../styles/HomePage.css";
import SideBar from "../components/allrequire/SideBar";
import DisplayComponents from "../components/allrequire/DisplayComponents";
import { useNavigate } from "react-router-dom";
import Logout from "../components/notLogin/Logout";
import { useLocalStorageData } from "../hooks/useLocalStorageData";
import { MyContext } from "../context/Component.context";
import { ComponentType } from "../types";
import { compareLocalStorageData } from "../utils/compareLocalStorageData";

const HomePage: React.FC = () => {
  const localStoragedata = useLocalStorageData();
  // console.log("LocalStorage Data:",localStoragedata)
  const [tablename, setTableName] = useState<string[]>([])
  const [component,setComponent] = useState<ComponentType[]>([])
  const navigate = useNavigate();
  const context = useContext(MyContext);

  useEffect(() => {
    // Ensure that table names are updated only if they are different from the current state
    const receivedtable = localStoragedata.map((comp) => comp.table_name);
    if (JSON.stringify(receivedtable) !== JSON.stringify(tablename)) {
      setTableName(receivedtable);
    }
  
    // Filter components based on table names
    const filteredComponent = context?.components.filter((comp) => tablename.includes(comp.table_name));
  
    // Only update component state if filtered component changes
    if (filteredComponent && JSON.stringify(filteredComponent) !== JSON.stringify(component)) {
      setComponent(filteredComponent);
    }
  }, [localStoragedata, tablename, context?.components]);  // Keep tablename and context.components as dependencies

  useEffect(() => {
    if (component.length > 0) {
      component.forEach((singleComponent) => {
        // console.log("Single Component:",sin)
        compareLocalStorageData(singleComponent); // Pass each component one by one
      });
    }
  }, [component]); // Trigger when component state changes
  
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
          {localStoragedata.length > 0 ? (
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
