import axios from "axios";
import "../../styles/SideBar.css";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [components, setComponents] = useState<{ name: string }[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/componentsposition")
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
    setSelectedComponents((prev) => [...prev, name]);
  };

  return (
    <div className="Sidebar">
      <h2>Components List</h2>
      {components.map((item, index) => (
        <h3 key={index} onClick={() => handleSelectComponent(item.name)}>
          <a href="#">{item.name}</a>
        </h3>
      ))}
    </div>
  );
};

export default SideBar;
