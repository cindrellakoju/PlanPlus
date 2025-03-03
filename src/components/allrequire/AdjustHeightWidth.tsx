import { JSX, useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/Component.context";
import TopPriority from "../toppriority/TopPriority";
import ToDo from "../todo/ToDo";
import BucketList from "../bucketlist/BucketList";
import Schedule from "../schedule/Schedule";
import Money from "../money/Money";
import ToBuy from "../tobuy/ToBuy";
import axios from "axios";

// Map component names to their respective React components (not instantiated yet)
const componentMap: { [key: string]: React.ComponentType<{ width: number }> } = {
  TopPriority,
  ToDo,
  BucketList,
  Schedule,
  Money,
  ToBuy,
};

const AdjustHeightWidth = () => {
  const context = useContext(MyContext);
  if (!context) {
    console.log("Wrap AdjustHeightWidth by MyProvider");
    return null;
  }

  useEffect(()=>{
    context.setEditHWMode(true)
  },[])
  console.log("Selected Component", context?.selectedComponents);

  const handleResizeWidth = (id: number, newWidth: number) => {
    const updatedComponents = context.selectedComponents.map((comp) => {
      if (comp.component_id === id) {
        return { ...comp, position_x: newWidth };
      }
      return comp;
    });

    console.log("Updated Component", updatedComponents);
    context.setSelectedComponents(updatedComponents);

    axios
      .put(`http://localhost:5000/user/componentsposition/edit/${id}`, {
        position_x: newWidth,
      })
      .then(() => console.log(`Updated width for component ID ${id}`))
      .catch((err) => console.error(`Error updating width for component ID ${id}:`, err));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {context.selectedComponents.map((component, index) => {
        const [currentWidth, setCurrentWidth] = useState(component.position_x || 700); // Default width
        const Component = componentMap[component.name]; // Get the component dynamically

        return (
          <div key={index} style={{ position: "relative" }}>
            {/* Render the component with the currentWidth prop */}
            <div style={{ width: `${currentWidth}px`, transition: "width 0.1s ease" }}>
              {Component ? <Component width={currentWidth} /> : <div>Component not found</div>}
            </div>
            <div
              style={{
                backgroundColor: "palegreen",
                height: `${
                  component.position_y > 300 ? component.position_y : 300
                }px`,
                width: "10px",
                position: "absolute",
                bottom: "10px",
                right: "-20px",
                cursor: "ew-resize",
                padding: "5px",
                marginRight: "20px",
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                const initialWidth = currentWidth;
                const initialX = e.clientX;

                const onMouseMove = (moveEvent: MouseEvent) => {
                  const newWidth = initialWidth + (moveEvent.clientX - initialX);
                  setCurrentWidth(newWidth); // Update width in real-time
                };

                const onMouseUp = () => {
                  window.removeEventListener("mousemove", onMouseMove);
                  window.removeEventListener("mouseup", onMouseUp);
                  handleResizeWidth(component.component_id, currentWidth); // Finalize width
                };

                window.addEventListener("mousemove", onMouseMove);
                window.addEventListener("mouseup", onMouseUp);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AdjustHeightWidth;