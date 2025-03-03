import { JSX, useContext } from "react"
import { MyContext } from "../../context/Component.context"
import TopPriority from "../toppriority/TopPriority";
import ToDo from "../todo/ToDo";
import BucketList from "../bucketlist/BucketList";
import Schedule from "../schedule/Schedule";
import Money from "../money/Money";
import ToBuy from "../tobuy/ToBuy";

const componentMap: { [key: string]: JSX.Element } = {
    TopPriority: <TopPriority />,
    ToDo: <ToDo />,
    BucketList: <BucketList />,
    Schedule: <Schedule />,
    Money: <Money />,
    ToBuy: <ToBuy />,
  };

const AdjustHeightWidth = () => {
    const context = useContext(MyContext);
    if(!context){
        console.log("Wrap AdjustHeightWidth by MyProvider")
    }

    console.log("SElected Component",context?.selectedComponents)

    // const handleResizeWidth = (id: number, newWidth: number) => {
    //     const updatedComponents = context?.selectedComponents.map((comp) => {
    //         if (comp.component_id === id) {
    //             return { ...comp, position_x: newWidth };  // Properly return the updated component
    //         }
    //         return comp;  // Return unchanged component
    //     });
    
    //     console.log(updatedComponents)
    //     // Assuming context has a function to update state, like setSelectedComponents
    //     context?.setSelectedComponents(updatedComponents)  // Update state with the new components list
    // };
    
    return(
        <div 
        style={{    
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
            {
                context?.selectedComponents.map((component,index) => (
                    <div key={index} style={{ position : "relative"}}>
                        {componentMap[component.name]}  
                        <div 
                            style={{
                                backgroundColor: "palegreen",
                                height: `${component.position_x > 300 ? component.position_x : 300}px`,
                                width: "10px",
                                position : "absolute",
                                bottom: '10px',
                                right: '-20px',
                                cursor: 'ew-resize', // Horizontal resize cursor for width
                                padding: '5px',
                                marginRight: "20px"
                            }}

                            onMouseDown={ (e) => {
                                e.preventDefault();
                                const initialWidth = component.position_x;
                                const initialX = e.clientX;

                                const onMouseMove = (moveEvent: MouseEvent) => {
                                    const newWidth = initialWidth + moveEvent.clientX - initialX;
                                    handleResizeWidth(component.component_id, newWidth);
                                }

                                const onMouseUp = () => {
                                    window.removeEventListener('mousemove',onMouseMove);
                                    window.removeEventListener('mouseup',onMouseUp);
                                };

                                window.addEventListener('mousemove',onMouseMove);
                                window.addEventListener('mouseup',onMouseUp);
                            }}
                        >
                            
                        </div>
                    </div> 
                ))
            }
        </div>
    )
}

export default AdjustHeightWidth