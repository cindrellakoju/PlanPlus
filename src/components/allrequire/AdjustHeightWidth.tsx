// import React, { useContext, useEffect, useState, useRef } from "react";
// import { MyContext } from "../../context/Component.context";
// import TopPriority from "../toppriority/TopPriority";
// import ToDo from "../todo/ToDo";
// import ToBuy from "../tobuy/ToBuy";
// import Schedule from "../schedule/Schedule";
// import BucketList from "../bucketlist/BucketList";
// import Money from "../money/Money";

// const componentMap: { [key: string]: React.ComponentType<{}> } = {
//   TopPriority,
//   ToDo,
//   ToBuy,
//   Schedule,
//   BucketList, 
//   Money
// };

// const AdjustHeightWidth: React.FC = () => {
//   const context = useContext(MyContext);
//   const [id,setId] = useState(0)
//   const [isDragging, setIsDragging] = useState(false);
//   const [isResizingWidth, setIsResizingWidth] = useState(false);

//   const upheightRef = useRef(0);
//   const distwidthRef = useRef(0);

//   // Add the event listeners for mouse move and mouse up when dragging
//   useEffect(() => {
//     if (isDragging || isResizingWidth) {
//       const handleMouseMove = (e: MouseEvent) => {
//         if (isDragging) {
//           const mousedrag = e.clientY - upheightRef.current;
//           console.log("Mouse Drag: ", mousedrag, "Actual Drag: ", e.clientY);
//           // Handle position update on drag (height)
//           context?.editHeightWidth.map((comp) => {
//             if (comp.component_id === id) {
//               context?.setEditHeightWidth(
//                 context?.editHeightWidth.map((item) =>
//                   item.component_id === id
//                     ? { ...item, position_y: mousedrag }
//                     : item
//                 )
//               );
//             }
//           });
//         }

//         if (isResizingWidth) {
//           const updatedwidth = e.clientX - distwidthRef.current;
//           console.log("Mouse Drag Width: ", updatedwidth);
//           // Handle position update on resize (width)
//           context?.editHeightWidth.map((comp) => {
//             if (comp.component_id === id) {
//               context?.setEditHeightWidth(
//                 context?.editHeightWidth.map((item) =>
//                   item.component_id === id
//                     ? { ...item, position_x: updatedwidth }
//                     : item
//                 )
//               );
//             }
//           });
//         }
//       };

//       const handleMouseUp = () => {
//         setIsDragging(false);
//         setIsResizingWidth(false);
//       };

//       // Add event listeners for mouse move and mouse up
//       window.addEventListener("mousemove", handleMouseMove);
//       window.addEventListener("mouseup", handleMouseUp);

//       // Cleanup the event listeners when dragging ends
//       return () => {
//         window.removeEventListener("mousemove", handleMouseMove);
//         window.removeEventListener("mouseup", handleMouseUp);
//       };
//     }
//   }, [isDragging, isResizingWidth, context]);

//   // Mouse down events
//   const handleMouseDownHeight = (e: React.MouseEvent<HTMLDivElement>, height: number, c_id: number) => {
//     upheightRef.current = e.clientY - height;
//     setIsDragging(true); // Start dragging when mouse is down
//     console.log("C_id:",c_id)
//     setId(c_id)
//   };

//   const handleMouseDownWidth = (e: React.MouseEvent<HTMLDivElement>, width: number, c_id: number) => {
//     distwidthRef.current = e.clientX - width;
//     setIsResizingWidth(true); // Start resizing when mouse is down
//     console.log("C_id:",c_id)
//     setId(c_id)
//   };

//   // Set initial state and context on component mount
//   useEffect(() => {
//     context?.setEditHWMode(true);
//     context?.setEditHeightWidth(context.selectedComponents);
//   }, []);

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         flexWrap: "wrap",
//         gap: "20px",
//       }}
//     >
//       {context?.editHeightWidth.map((comp) => {
//         const Component = componentMap[comp.name];
//         const height = comp.position_y;
//         const width = comp.position_x;
//         const comp_id = comp.component_id;
//         return (
//           <div style={{ position: "relative" }} key={comp.component_id}>
//             <div key={comp.component_id}>
//               {Component ? <Component /> : <p>Component not found</p>}
//             <div
//               style={{
//                 position: "absolute",
//                 left: "3px",
//                 backgroundColor: "pink",
//                 width: "98%",
//                 height: "10px",
//                 bottom: "2px",
//                 cursor: "ns-resize",
//                 borderBottomLeftRadius: "18px",
//                 borderBottomRightRadius: "18px",
//               }}
//               onMouseDown={(e) => handleMouseDownHeight(e, height, comp_id)}
//               onClick={(e) => console.log("IDDDDDDDDDDDDDDDDDDDD",comp_id)}
//             />
//             <div
//               style={{
//                 position: "absolute",
//                 right: "1.5px",
//                 bottom: "3px",
//                 backgroundColor: "red",
//                 height: "99%",
//                 width: "10px",
//                 cursor: "ew-resize",
//                 borderTopRightRadius: "18px",
//                 borderBottomRightRadius: "18px",
//               }}
//               onMouseDown={(e) => handleMouseDownWidth(e, width, comp_id)}
//             />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default AdjustHeightWidth;

import React, { useContext, useEffect, useState, useRef } from "react";
import { MyContext } from "../../context/Component.context";
import TopPriority from "../toppriority/TopPriority";
import ToDo from "../todo/ToDo";
import ToBuy from "../tobuy/ToBuy";
import Schedule from "../schedule/Schedule";
import BucketList from "../bucketlist/BucketList";
import Money from "../money/Money";

const componentMap: { [key: string]: React.ComponentType<{}> } = {
  TopPriority,
  ToDo,
  ToBuy,
  Schedule,
  BucketList, 
  Money
};

const AdjustHeightWidth: React.FC = () => {
  const context = useContext(MyContext);
  const [id,setId] = useState(0)
  const [isDragging, setIsDragging] = useState(false);
  const [isResizingWidth, setIsResizingWidth] = useState(false);

  const [upheight,setUpHeight] = useState(0)
  const [distwidth, setDistWdth] = useState(0)

  useEffect(() => {
    context?.setEditHWMode(true);
    context?.setEditHeightWidth(context.selectedComponents);
  }, []);

  console.log("state:",isDragging)
  useEffect(() => {
    if ( isDragging || isResizingWidth){
      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          const mousedrag = e.clientY - upheight;
          const updatedHeight= context?.editHeightWidth.map((comp) => {
            if (comp.component_id === id) {
              return {...comp,position_y:mousedrag}
            }
            return comp
          });
          if(updatedHeight){
            context?.setEditHeightWidth(updatedHeight)
          }
          console.log("Updated Component:",updatedHeight)
        }

        if(isResizingWidth){
          const dragwidth = e.clientX - distwidth;
          const updatedwidth = context?.editHeightWidth.map((comp)=> {
              if(comp.component_id === id) {
                return { ...comp, position_x: dragwidth}
              }
              return comp
          });
          if(updatedwidth){
            context?.setEditHeightWidth(updatedwidth)
          }
        }
      }
      

      const handleMouseUp =  () => {
        setIsDragging(false)
        setIsResizingWidth(false)
      };

      window.addEventListener("mousemove",handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)

      // Clean the event listener when dragging ends
      return () => {
        window.removeEventListener("mousemove",handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging,isResizingWidth])

  const handleMouseDownWidth = (e:React.MouseEvent<HTMLDivElement>,c_id:number , width:number) => {
      console.log("Width MAnagemet");
      setDistWdth(e.clientX - width);
      console.log("ID from width", c_id)
      setId(c_id)
      setIsResizingWidth(true)
    }
    
    const handleMouseDownHeight = (e:React.MouseEvent<HTMLDivElement>,c_id:number , height:number) => {
      console.log("HYAAAAAAAAAAAAAAAAAAAA",e.clientY , height)
      setUpHeight( e.clientY - height);
      console.log("ID from height", c_id)
      setId(c_id)
      setIsDragging(true);
  }
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
        const comp_id = comp.component_id;
        return (
          <div style={{ position: "relative" }} key={comp.component_id}>
            <div key={comp.component_id}>
              {Component ? <Component /> : <p>Component not found</p>}
            <div
              style={{
                position: "absolute",
                left: "3px",
                backgroundColor: "pink",
                width: `${width}px`,
                height: "10px",
                bottom: "2px",
                cursor: "ns-resize",
                borderBottomLeftRadius: "18px",
                borderBottomRightRadius: "18px",
              }}
              onMouseDown={(e) => handleMouseDownHeight(e, comp_id, height)}
            />
            <div
              style={{
                position: "absolute",
                right: "1.5px",
                bottom: "3px",
                backgroundColor: "red",
                height: `${height}px`,
                width: "10px",
                cursor: "ew-resize",
                borderTopRightRadius: "18px",
                borderBottomRightRadius: "18px",
              }}
              onMouseDown={(e) => handleMouseDownWidth(e, comp_id, width)}
            />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdjustHeightWidth;
