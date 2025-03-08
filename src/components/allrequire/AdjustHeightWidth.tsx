import React, { useContext, useEffect, useState, useRef } from "react";
import { MyContext } from "../../context/Component.context";
import TopPriority from "../toppriority/TopPriority";

const componentMap: { [key: string]: React.ComponentType<{}> } = {
  TopPriority,
};

const AdjustHeightWidth: React.FC = () => {
  const context = useContext(MyContext);
  const [upheight, setUpHeight] = useState<number>(120);
  const [distwidth, setDistWidth] = useState<number>(0); // Initialize with 0

  const [isDragging, setIsDragging] = useState(false);
  const [isResizingWidth, setIsResizingWidth] = useState(false);

  const upheightRef = useRef(0);
  const distwidthRef = useRef(0);

  // Add the event listeners for mouse move and mouse up when dragging
  useEffect(() => {
    if (isDragging || isResizingWidth) {
      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          const mousedrag = e.clientY - upheightRef.current;
          console.log("Mouse Drag: ", mousedrag, "Actual Drag: ", e.clientY);
          // Handle position update on drag (height)
          context?.editHeightWidth.map((comp) => {
            if (comp.component_id === comp.component_id) {
              context?.setEditHeightWidth(
                context?.editHeightWidth.map((item) =>
                  item.component_id === comp.component_id
                    ? { ...item, position_y: mousedrag }
                    : item
                )
              );
            }
          });
        }

        if (isResizingWidth) {
          const updatedwidth = e.clientX - distwidthRef.current;
          console.log("Mouse Drag Width: ", updatedwidth);
          // Handle position update on resize (width)
          context?.editHeightWidth.map((comp) => {
            if (comp.component_id === comp.component_id) {
              context?.setEditHeightWidth(
                context?.editHeightWidth.map((item) =>
                  item.component_id === comp.component_id
                    ? { ...item, position_x: updatedwidth }
                    : item
                )
              );
            }
          });
        }
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizingWidth(false);
      };

      // Add event listeners for mouse move and mouse up
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      // Cleanup the event listeners when dragging ends
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizingWidth, context]);

  // Mouse down events
  const handleMouseDownHeight = (e: React.MouseEvent<HTMLDivElement>, height: number) => {
    upheightRef.current = e.clientY - height;
    setIsDragging(true); // Start dragging when mouse is down
  };

  const handleMouseDownWidth = (e: React.MouseEvent<HTMLDivElement>, width: number) => {
    distwidthRef.current = e.clientX - width;
    setIsResizingWidth(true); // Start resizing when mouse is down
  };

  // Set initial state and context on component mount
  useEffect(() => {
    context?.setEditHWMode(true);
    context?.setEditHeightWidth(context.selectedComponents);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {context?.editHeightWidth.map((comp) => {
        const Component = componentMap[comp.name];
        const height = comp.position_y;
        const width = comp.position_x;

        return (
          <div style={{ position: "relative" }} key={comp.component_id}>
            <div>
              {Component ? <Component /> : <p>Component not found</p>}
            </div>
            <div
              style={{
                position: "absolute",
                left: "3px",
                backgroundColor: "pink",
                width: "98%",
                height: "10px",
                bottom: "2px",
                cursor: "ns-resize",
                borderBottomLeftRadius: "18px",
                borderBottomRightRadius: "18px",
              }}
              onMouseDown={(e) => handleMouseDownHeight(e, height)}
            />
            <div
              style={{
                position: "absolute",
                right: "1.5px",
                bottom: "3px",
                backgroundColor: "red",
                height: "99%",
                width: "10px",
                cursor: "ew-resize",
                borderTopRightRadius: "18px",
                borderBottomRightRadius: "18px",
              }}
              onMouseDown={(e) => handleMouseDownWidth(e, width)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AdjustHeightWidth;
