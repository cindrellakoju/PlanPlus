// import { useContext, useEffect, useState } from "react";
// import { MyContext } from "../../context/Component.context";
// import TopPriority from "../toppriority/TopPriority";
// import ToDo from "../todo/ToDo";
// import BucketList from "../bucketlist/BucketList";
// import Schedule from "../schedule/Schedule";
// import Money from "../money/Money";
// import ToBuy from "../tobuy/ToBuy";



// // Map component names to their respective React components (not instantiated yet)
// const componentMap: { [key: string]: React.ComponentType<{ width: number, height: number }> } = {
//   TopPriority,
//   ToDo,
//   BucketList,
//   Schedule,
//   Money,
//   ToBuy,
// };

// const AdjustHeightWidth = () => {
//   const context = useContext(MyContext);
//   if (!context) {
//     console.log("Wrap AdjustHeightWidth by MyProvider");
//     return null;
//   }

//   useEffect(()=>{
//     context.setEditHWMode(true)
//   },[])
//   console.log("Selected Component", context?.selectedComponents);

//   const handleResizeWidth = (id: number, newWidth: number) => {
//     const updatedComponents = context.selectedComponents.map((comp) => {
//       if (comp.component_id === id) {
//         return { ...comp, position_x: newWidth };
//       }
//       return comp;
//     });

//     console.log("Updated Component", updatedComponents);
//     context.setSelectedComponents(updatedComponents);
//   };

//   const handleResizeHeight = (id:number, newHeight: number) => {
//     const updateHeight = context.selectedComponents.map((comp) => {
//       if(comp.component_id === id){
//         return{...comp, position_y: newHeight};
//       } 
//       return comp;
//     })

//     context.setSelectedComponents(updateHeight)
//   }
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         flexWrap: "wrap",
//         gap: "20px",
//       }}
//     >
//       {context.selectedComponents.map((component, index) => {
//         const [currentWidth, setCurrentWidth] = useState(component.position_x || 700); // Default width
//         const [currentHeight, setCurrentHeight] = useState(component.position_y  || 320);
//         const Component = componentMap[component.name]; // Get the component dynamically

//         return (
//           <div key={index} style={{ position: "relative" }}>
//             {/* Render the component with the currentWidth prop */}
//             <div style={{ width: `${currentWidth}px`,height: `${currentHeight}px`, transition: "width 0.1s ease" }}>
//               {Component ? <Component width={currentWidth} height={currentHeight}/> : <div>Component not found</div>}
//             </div>
//             <div
//               style={{
//                 backgroundColor: "palegreen",
//                 height: `${
//                   component.position_y > 300 ? component.position_y : 300
//                 }px`,
//                 width: "10px",
//                 position: "absolute",
//                 bottom: "10px",
//                 right: "-20px",
//                 cursor: "ew-resize",
//                 padding: "5px",
//                 marginRight: "20px",
//               }}
//               onMouseDown={(e) => {
//                 // stop default browser behaviour eg:Text selection
//                 e.preventDefault();
//                 const initialWidth = currentWidth;
//                 // clientX represent horizontal coordinate
//                 const initialX = e.clientX;

//                 const onMouseMove = (moveEvent: MouseEvent) => {
//                   const newWidth = initialWidth + (moveEvent.clientX - initialX);
//                   setCurrentWidth(newWidth); // Update width in real-time
//                 };

//                 const onMouseUp = () => {
//                   window.removeEventListener("mousemove", onMouseMove);
//                   window.removeEventListener("mouseup", onMouseUp);
//                   handleResizeWidth(component.component_id, currentWidth); // Finalize width
//                 };

//                 window.addEventListener("mousemove", onMouseMove);
//                 window.addEventListener("mouseup", onMouseUp);
//               }}
//             />
//             <div
//               style={{
//                 width: `${component.position_x > 300 ? component.position_x : 300}px`,
//                 height:"10px",
//                 position: "absolute",
//                 backgroundColor: "pink",
//                 bottom: "3px",
//                 cursor: "ns-resize"
//               }}

//               onMouseDown={(e) => {
//                 e.preventDefault();
//                 const initialHeight = component.position_y;
//                 const initialY = e.clientY;

//                 const onMouseMove = (mousemove : MouseEvent)  => {
//                   const newHeight = initialHeight+(mousemove.clientY - initialY);
//                   setCurrentHeight(newHeight);
//                 }

//                 const onMouseUp = () =>{
//                   window.removeEventListener('mousemove', onMouseMove);
//                   window.removeEventListener("mouseup", onMouseUp);
//                   handleResizeHeight(component.component_id, currentHeight)
//                 }

//                 window.addEventListener("mousemove", onMouseMove );
//                 window.addEventListener("mouseup", onMouseUp);
//               }}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default AdjustHeightWidth;


import React, { useContext, useState } from "react"
import { MyContext } from "../../context/Component.context"
import TopPriority from "../toppriority/TopPriority"
import ToDo from "../todo/ToDo"
import BucketList from "../bucketlist/BucketList";
import Schedule from "../schedule/Schedule";
import Money from "../money/Money";
import ToBuy from "../tobuy/ToBuy";

const componentMap : {[key:string]:React.ComponentType<{height : number}>} = {
  TopPriority,
  ToDo,
  BucketList,
  Schedule,
  Money,
  ToBuy
};

const AdjustHeightWidth  : React.FC = () => {
  const context = useContext(MyContext)
  if(!context){
    console.log("Wrap AdjustHeightWidth in MyProvide")
  }

  context?.setEditHWMode(true)
  console.log("Selected Component:",context?.selectedComponents)
  return(
    <div style={{ position : "relative"}}>
      {
        context?.selectedComponents.map((component, index) => {
          const Component = componentMap[component.name]
          const [height,setHeight] = useState<number>(component.position_y || 320)
          const [width,setWidth] = useState<number>(component.position_y || 320)
          
          return(
            <div style={{ height: `${height}px`}}>
            {
              Component ? <Component height={height}/> : <div>No Component Found</div>
            }
            <div style={{
              position: "absolute",
              backgroundColor: "pink",
              bottom: "5px"
            }}>

            </div>
            </div>
        );
        })
      }
    </div>
  )
}

export default AdjustHeightWidth