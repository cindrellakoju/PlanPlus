import axios from "axios";
import "../../styles/SideBar.css";
import { useContext, useEffect} from "react";
import { MyContext } from "../../context/selectedComponent";
import { Component } from "../../types";

const SideBar: React.FC = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("Context must be used within a MyProvider");
  }

 

  // Fetch components data from API when the component mounts
  useEffect(() => {
    axios
      .get<Component[]>("http://localhost:5000/user/componentsposition") // Typing the response data
      .then((response) => {
        console.log("Successfully fetched components: ", response.data);
        context.setComponents(response.data); // Set the components list
      })
      .catch((error) => {
        console.log("Error fetching the data: ", error);
      });
  }, []);

  // Handle selection of a component
  const handleSelectComponent = (name: string) => {
     // Avoid adding duplicates
    if (!context.selectedComponents.includes(name)) {
        context.setSelectedComponents([...context.selectedComponents, name]);
    }
  };

  return (
    <div className="Sidebar">
      {context.components.map((item, index) => (
        <div
          key={index}
          onClick={() => handleSelectComponent(item.name)}
          className="component-item"
        >
         <h2 style={{ fontSize: "1.7rem", fontWeight: "bold"}}>{item.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
