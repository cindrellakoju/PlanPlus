import axios from "axios";
import "../../styles/SideBar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "../../context/Component.context";
import { ComponentType } from "../../types";

const SideBar: React.FC = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  // Use context
  const context = useContext(MyContext);

  // Ensure context is available
  if (!context) {
    throw new Error("SideBar must be used within a MyProvider");
  }

  // Fetch components data from the API on mount
  useEffect(() => {
    axios
      .get<ComponentType[]>(`${backend_url}/user/componentsposition`) // API endpoint for components
      .then((response) => {
        console.log("Successfully fetched components: ", response.data);
        context.setComponents(response.data); // Set the fetched components to context
      })
      .catch((error) => {
        console.error("Error fetching the data: ", error); // Handle any errors
      });
  }, []);

  // Handle component selection
  const handleSelectComponent = (component: ComponentType) => {
    const alreadySelected = context.selectedComponents.some(
      (comp) => comp.name === component.name && comp.component_id === component.component_id
    );

    if (!alreadySelected) {
      context.setSelectedComponents([
        ...context.selectedComponents,
        { name: component.name,
          component_id: component.component_id, 
          position_x: component.position_x,
          position_y: component.position_y, 
          order_index:component.order_index }, // Add to selected components
      ]);
    }
  };

  return (
    <div className="Sidebar">
      {context.components.map((component) => (
        <div
          key={component.component_id} // Use component_id as key for uniqueness
          onClick={() => handleSelectComponent(component)} // Pass whole component object
          className="component-item"
        >
          <h2 style={{ fontSize: "1.7rem", fontWeight: "bold" }}>{component.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
