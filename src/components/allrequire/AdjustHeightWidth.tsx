import React, { useContext, useEffect, useState } from "react"
import { MyContext } from "../../context/Component.context"
import TopPriority from "../toppriority/TopPriority"

const componentMap: { [key:string]: React.ComponentType<{}>} = {
  TopPriority,
  
}
const AdjustHeightWidth: React.FC = () => {
  const context = useContext(MyContext)

  if(!context){
    console.log("Wrap AdjustHeightWidth within MyProvider")
  }

  useEffect(()=> {
    context?.setEditHeightWidth(context.selectedComponents)
    context?.setEditHWMode(true)
  }, [])

  const needtoeditComponent = context?.editHeightWidth || []
  console.log(needtoeditComponent)

  const handlechangeheight = (id:number, upatedheight : number) => {
    const upheight = needtoeditComponent?.map((comp) => {
      if(comp.component_id === id){
        return{...comp,position_y : upatedheight}
      }
      return comp
    })
    console.log("Updated component: ", upheight)
    console.log("Updated Height: ", upatedheight)
    context?.setEditHeightWidth(upheight)
  }
 return (
    <div style={{ display: "flex" , flexDirection: "row", flexWrap: "wrap", gap: "20px"}}>
        {
          needtoeditComponent?.map((component,index) => {
            const [height, setHeight] = useState(component.position_y);
            const [width, setWidth] =useState(component.position_x)
            const Component = componentMap[component.name];
            console.log("Height:  ",height);
            return(
              <div key={index} style={{ position: "relative" }}>
                <div>
                  {Component ? <Component/> : <div>Component Not found</div>}
                </div>  
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "pink",
                    width: `${width}px`,
                    height: "10px",
                    bottom: "2px",
                    cursor: "ns-resize"
                  }}

                  onMouseDown={(e) => {
                    e.preventDefault();

                    const initialHeight = height;
                    const initialY = e.clientY

                    const onMouseMove = (mousemove: MouseEvent) => {
                        const updatedheight = initialHeight + (mousemove.clientY - initialY)
                        setHeight(updatedheight)
                    } 

                    const onMouseUp = () => {
                      window.removeEventListener('mousemove',onMouseMove);
                      window.removeEventListener('mouseup',onMouseUp);
                      handlechangeheight(component.component_id,height);
                    }

                    window.addEventListener('mousemove',onMouseMove);
                    window.addEventListener('mouseup',onMouseUp)
                  }}
                />
              </div>  
            )
          })
        }
    </div>
 )
}

export default AdjustHeightWidth