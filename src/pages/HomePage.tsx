// import React, { useContext, useState } from "react";
// import "../styles/HomePage.css";
// import SideBar from "../components/allrequire/SideBar";
// import { MyContext } from "../context/Component.context";
// import DisplayComponents from "../components/allrequire/DisplayComponents";
// import { useNavigate } from "react-router-dom";
// import Logout from "../components/notLogin/Logout";

// const HomePage: React.FC = () => {

//   const navigate = useNavigate();
//   const context = useContext(MyContext);

//   if (!context) {
//     throw new Error("Homepage context must be within MyProvider");
//   }

//   console.log(context.selectedComponents)
//   const [displaySidebar, setSideBar] = useState<boolean>(false);
//   const [isEditMode, setIsEditMode] = useState<boolean>(false); // New state for edit mode

//   const toggleSidebar = () => {
//     setSideBar((prevState) => !prevState);
//   };


//   const displayEditMode = () => {
//     setIsEditMode(true); // Activate edit mode
//   };

//   // If in edit mode, show the HomePageEdit component
//   if (isEditMode) {
//     navigate("/homepgedit")
//     // return <HomePageEdit />;
//   }

//   return (
//     <div className="HomePage">
//       {/* Sidebar Component */}
//       <div className={`sidebar ${displaySidebar ? 'open' : 'closed'}`} style={{ width: displaySidebar ? "30%" : "0%"}}>
//         {displaySidebar && <SideBar />}
//       </div>

//       {/* Main Content */}
//       <div className="bodypart">
//         <div className="iconBar">
//           <i className="bx bx-list-ul" onClick={toggleSidebar}></i>
//           <button onClick={displayEditMode}>Edit</button> {/* On click, trigger edit mode */}
//         </div>
//         <div className="body">
//           {context.selectedComponents.length > 0 ? (
//             <div className="displaycomponent">
//               <DisplayComponents />
//             </div>
//           ) : (
//             <>
//               <h1>Welcome to PlanPlus Cinderella</h1>
//               <p>
//                 Click <i className="bx bx-list-ul"></i> to add the required fields.
//               </p>
//               <Logout/>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


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
  const [displaySidebar, setSideBar] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null); // State for storing user info

  // Retrieve user information from localStorage
  useEffect(() => {
    console.log(localStorage)
    const storedUserInfo = localStorage.getItem('userInfo');
    console.log("Stored User Info:", storedUserInfo)
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo)); // Set the user info to state
    }
  }, []);

  if (!context) {
    throw new Error("Homepage context must be within MyProvider");
  }

  const toggleSidebar = () => {
    setSideBar((prevState) => !prevState);
  };

  const displayEditMode = () => {
    setIsEditMode(true); // Activate edit mode
  };

  // If in edit mode, show the HomePageEdit component
  if (isEditMode) {
    navigate("/homepgedit");
    return; // Prevent rendering the rest of the page if in edit mode
  }

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
          {userInfo ? ( // If the userInfo exists, display user details
            <div className="userInfo">
              <h2>Welcome, {userInfo.first_name} {userInfo.last_name}</h2>
              <p>Email: {userInfo.email}</p>
            </div>
          ) : (
            <h1>Welcome to PlanPlus Cinderella</h1>
          )}

          {context.selectedComponents.length > 0 ? (
            <div className="displaycomponent">
              <DisplayComponents />
            </div>
          ) : (
            <>
              <h1>Click <i className="bx bx-list-ul"></i> to add the required fields.</h1>
              <Logout />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
