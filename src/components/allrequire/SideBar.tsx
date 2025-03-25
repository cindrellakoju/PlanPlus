import "../../styles/SideBar.css";
import { useContext} from "react";
import { MyContext } from "../../context/Component.context";
import { ComponentType } from "../../types";
import { compareLocalStorageData } from "../../utils/compareLocalStorageData";

const SideBar: React.FC = () => {
  // Use context
  const context = useContext(MyContext);

  // Ensure context is available
  if (!context) {
    throw new Error("SideBar must be used within a MyProvider");
  }

  // Handle component selection
  const handleSelectComponent = (component: ComponentType) => {
    console.log("REceived Component,",component)
    compareLocalStorageData(component)
  };
  
  console.log("Context component:", context.components)
  return (
    <div className="Sidebar">
      {context.components.map((component) => (
        <div
          key={component.user_table_id} // Use component_id as key for uniqueness
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
