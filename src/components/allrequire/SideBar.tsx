import axios from "axios";
import "../../styles/SideBar.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/Component.context";
import { ComponentType } from "../../types";

const SideBar: React.FC = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;


  const storedUser = localStorage.getItem('userdetail');
    const [userid, setUserId] = useState<{ user_id:string} | null>(null);
  
    useEffect(() => {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser); // Store parsed user info in state
      }
    }, [storedUser]);

    const userId = userid?.user_id
    console.log("User ID:",userId)
  // Use context
  const context = useContext(MyContext);

  // Ensure context is available
  if (!context) {
    throw new Error("SideBar must be used within a MyProvider");
  }

  console.log(`${backend_url}/user/tablename/${userId}`)
  // Fetch components data from the API on mount
  useEffect(() => {
    if(userId){
    axios
      .get(`${backend_url}/user/tablename/${userId}`) // API endpoint for components
      .then((response) => {
        console.log("Successfully fetched components: ", response.data);
        context.setComponents(response.data); // Set the fetched components to context
      })
      .catch((error) => {
        console.error("Error fetching the data: ", error); // Handle any errors
      });
    }
  }, [userId]);

  // Handle component selection
  const handleSelectComponent = (component: ComponentType) => {
    console.log("S Comp", context.selectedComponents)
    const alreadySelected = context.selectedComponents.some(
      (comp) => {comp.table_name === component.table_name && comp.user_table_id === component.user_table_id }
    );
    console.log("Component", component)
    console.log("Already exist",alreadySelected )

    if(!alreadySelected){
      context.setSelectedComponents([...context.selectedComponents, component])
    }
  };

  useEffect(() => {
    console.log("Selected Component updated:", context.selectedComponents);
  }, [context.selectedComponents]);
  

  
  console.log("Context component:", context.components)
  return (
    <div className="Sidebar">
      {context.components.map((component) => (
        <div
          key={component.component_id} // Use component_id as key for uniqueness
          onClick={() => handleSelectComponent(component)} // Pass whole component object
          className="component-item"
        >
          <h2 style={{ fontSize: "1.7rem", fontWeight: "bold" }}>{component.table_name}</h2>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
