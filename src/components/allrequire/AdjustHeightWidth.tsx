import React, { useContext, useEffect, useState } from "react"
import { MyContext } from "../../context/Component.context"
import TopPriority from "../toppriority/TopPriority"

const componentMap: { [key:string]: React.ComponentType<{}>} = {
  TopPriority,
  
}
const AdjustHeightWidth: React.FC = () => {
  const context = useContext(MyContext)
  const [upheight,setUpHeight] = useState<number>(120)
  // whole field ko leftcorner dekhi component ko left corner sama ko distance
  const [distwidth,setDistWidth] = useState<number>(1)

  useEffect(() => {
    context?.setEditHWMode(true)
    context?.setEditHeightWidth(context.selectedComponents)
  }, [])


  const handleDrag = (e: React.MouseEvent<HTMLDivElement>, id: number,upheight: number ) => {
    const mousedrag = e.clientY - upheight;
    console.log("Mouse Drag: ", mousedrag, "Actual Drag: ", e.clientY);
  
    context?.editHeightWidth.map((comp) => {
      if (comp.component_id === id) {
        context.setEditHeightWidth(
          context.editHeightWidth.map((item) =>
            item.component_id === id
              ? { ...item, position_y: mousedrag } 
              : item 
          )
        );
      }
    });
  };
  

  const handleDragEnd = (e : React.MouseEvent<HTMLDivElement>) => {
    console.log("DragEnd: ",e.clientY)
  }

  const handleWidthDrag = (e:React.MouseEvent<HTMLDivElement>, id: number , distwidth : number) => {
    const updatedwidth =e.clientX - distwidth
    console.log("Mouse Drag: ", updatedwidth, "Actual Drag: ", e.clientY);
    context?.editHeightWidth.map((comp) => {
      if(comp.component_id === id){
        context.setEditHeightWidth(
          context.editHeightWidth.map((item) => 
            item.component_id === id
              ? {...item, position_x : updatedwidth }
              : item
          )
        )
      }
    })
  }
  return(
    <div style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "20px"
    }}>
        {
          context?.editHeightWidth.map((comp)=> {
            const Component = componentMap[comp.name]
            const height = comp.position_y
            const width = comp.position_x

            return(
              <div style={{ position: "relative"}}>
                <div >
                  {Component? <Component/> : <p>Component not found</p>}
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
                      borderBottomRightRadius: "18px"
                  }}

                  onMouseDown={(e:React.MouseEvent<HTMLDivElement>) =>{
                    setUpHeight(e.clientY - height)
                  }}
                  onDrag={(e) => handleDrag(e,comp.component_id,upheight )}
                  onDragEnd={handleDragEnd}
                />
                <div
                  style={{
                      position: "absolute",
                      right: "1.5px",
                      bottom: "3px",
                      backgroundColor: "red",
                      height : "99%",
                      width: "10px",
                      cursor: "ew-resize",
                      borderTopRightRadius: "18px",
                      borderBottomRightRadius: "18px"
                  }}

                  onMouseDown={(e) => {
                    setDistWidth(e.clientX-width)
                  }}

                  onDrag={(e) => handleWidthDrag(e, comp.position_x,distwidth)}
                />
              </div>
            )
          })
        }
    </div>
  )
}

export default AdjustHeightWidth