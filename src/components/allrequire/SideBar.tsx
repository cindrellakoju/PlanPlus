import "../../styles/SideBar.css";
import { useContext} from "react";
import { MyContext } from "../../context/Component.context";
import { ComponentType } from "../../types";

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
    const localStoragedataString = localStorage.getItem("selecteditem")
    let localStoragedata:ComponentType[] = []
    if(localStoragedataString){
      localStoragedata = JSON.parse(localStoragedataString)
    }

    const alreadySelected = localStoragedata.some((comp) => {
      console.log("Component Name:",comp.table_name,comp.orderindex, component.orderindex);
      return (
        comp.table_name === component.table_name &&
        comp.user_table_id === component.user_table_id &&
        comp.orderindex === component.orderindex &&
        comp.height === component.height &&
        comp.width === component.width
      );
    });    

    console.log("Aleade:",alreadySelected)

    if(!alreadySelected){
      const sameTableName = localStoragedata.some(
        (comp) => comp.table_name === component.table_name && comp.user_table_id === component.user_table_id
      );
  
      // If a component with the same table_name exists, we remove it and add the new component
      if (sameTableName) {
        const updatedData = localStoragedata.filter(
          (comp) =>
            !(comp.table_name === component.table_name && comp.user_table_id === component.user_table_id)
        );
        updatedData.push(component);

        updatedData.sort((a, b) => a.orderindex - b.orderindex); // Numeric sort for order_index
        localStorage.setItem("selecteditem", JSON.stringify(updatedData));
      }
      else{
        const selectedData = [...localStoragedata, component];
        selectedData.sort((a, b) => a.order_index - b.order_index); // Numeric sort for order_index
        localStorage.setItem("selecteditem", JSON.stringify(selectedData));
      }
    }
  };
  
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
