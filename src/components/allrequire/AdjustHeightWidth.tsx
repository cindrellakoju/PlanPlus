import React, { JSX, useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/Component.context";
import TopPriority from "../toppriority/TopPriority";
import ToDo from "../todo/ToDo";
import ToBuy from "../tobuy/ToBuy";
import Schedule from "../schedule/Schedule";
import BucketList from "../bucketlist/BucketList";
import Money from "../money/Money";

// const componentMap: { [key: string]: React.ComponentType<{}> } = {
//   TopPriority,
//   ToDo,
//   ToBuy,
//   Schedule,
//   BucketList, 
//   Money
// };

const componentMap: { [key: string]: JSX.Element } = {
  TopPriority: <TopPriority />,
  ToDoList: <ToDo />,
  BucketList: <BucketList />,
  Schedule: <Schedule />,
  MoneyTransaction: <Money />,
  ToBuy: <ToBuy />,
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

  console.log("state of width:",isResizingWidth)
  useEffect(() => {
    if ( isDragging || isResizingWidth){
      console.log("Working here")
      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          const mousedrag = e.clientY - upheight;
          const updatedHeight= context?.editHeightWidth.map((comp) => {
            if (comp.user_table_id === id) {
              return {...comp,height:mousedrag}
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
              if(comp.user_table_id === id) {
                return { ...comp, width: dragwidth}
              }
              return comp
          });
          console.log(updatedwidth)
          if(updatedwidth){
            context?.setEditHeightWidth(updatedwidth)
          }
        }
      }
      console.log("Update:",context?.setEditHeightWidth)
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
        const Component = removeSpaces(comp.table_name);
        const ComponentRender = componentMap[Component]
        const height = comp.height;
        const width = comp.width;
        const comp_id = comp.user_table_id;
        
        return (
          <div  key={comp.user_table_id}>
            <div style={{ position: "relative" }}>
              <div key={comp.user_table_id}>
                {ComponentRender}
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
          </div>
        );
      })}
    </div>
  );
};

function removeSpaces(str:string) {
  return str.replace(/\s+/g, ''); // Removes all spaces
}

export default AdjustHeightWidth;
