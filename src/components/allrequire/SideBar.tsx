import axios from "axios";
import "../../styles/SideBar.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/selectedComponent";

// Define a type for the components
interface Component {
  name: string;
}

const SideBar: React.FC = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("Context must be used within a MyProvider");
  }

  const [components, setComponents] = useState<Component[]>([]);

  // Fetch components data from API when the component mounts
  useEffect(() => {
    axios
      .get<Component[]>("http://localhost:5000/user/componentsposition") // Typing the response data
      .then((response) => {
        console.log("Successfully fetched components: ", response.data);
        setComponents(response.data); // Set the components list
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
      <h2>Components List</h2>
      {components.map((item, index) => (
        <div
          key={index}
          onClick={() => handleSelectComponent(item.name)}
          className="component-item" // Add a class for styling
        >
          {item.name}
        </div>
      ))}

      {/* Uncomment this to show the selected components */}
      <div>
        <h2>Selected Components:</h2>
        <ul>
          {context.selectedComponents.map((component, index) => (
            <li key={index}>{component}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
