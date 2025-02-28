import React, { useContext, useState } from "react";
import "../styles/HomePage.css";
import SideBar from "../components/allrequire/SideBar";
import { MyContext } from "../context/selectedComponent";
import DisplayComponents from "../components/allrequire/DisplayComponents";

const HomePage: React.FC = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("Homepage context must be within MyProvider");
  }

  const [displaySidebar, setSideBar] = useState<boolean>(false);

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setSideBar((prevState) => !prevState);
  };

  const displayeditmode = () => {
    alert("Edit mode activated");
  }
  return (
    <div className="HomePage">
      {/* Sidebar Component */}
      <div className={`sidebar ${displaySidebar ? 'open' : 'closed'}`} style={{ width: displaySidebar ? "30%" : "0%"}}>
        {displaySidebar && <SideBar />}
      </div>

      {/* Main Content */}
      <div className="bodypart">
        <div className="iconBar" >
          <i className="bx bx-list-ul" onClick={toggleSidebar}></i>
          <button onClick={displayeditmode}>Edit</button>
        </div>
        <div className="body">
          {context.selectedComponents.length > 0 ? (
            <div className="displaycomponent">
              <DisplayComponents />
            </div>
          ) : (
            <>
              <h1>Welcome to PlanPlus Cinderella</h1>
              <p>
                Click <i className="bx bx-list-ul"></i> to add the required fields.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
