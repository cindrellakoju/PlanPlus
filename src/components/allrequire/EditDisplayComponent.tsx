import React, { JSX, useContext } from "react"
import { MyContext } from "../../context/Component.context"
import TopPriority from "../toppriority/TopPriority"
import ToDo from "../todo/ToDo"
import BucketList from "../bucketlist/BucketList"
import Schedule from "../schedule/Schedule"
import Money from "../money/Money"
import ToBuy from "../tobuy/ToBuy"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

const componentMap: { [key : string] : JSX.Element} = {
    TopPriority: <TopPriority />,
    ToDo: <ToDo />,
    BucketList: <BucketList />,
    Schedule: <Schedule />,
    Money: <Money />,
    ToBuy: <ToBuy />,
}
const EditDisplayComponents:React.FC = () => {
    const context = useContext(MyContext)

    if(!context){
        console.log("DisplayComponents should be wrapper within MyProvider");
    }

    const handleDragEnd = () =>{
        console.log("Dragged")
    }
    const selectedComponent = context?.selectedComponents
    return(
        // <DragDropContext onDragEnd={handleDragEnd}>
        //     <Droppable droppableId="componentid" direction="horizontal" >
        //         {(provided) => (
        //             <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: "flex" , flexDirection: "row", flexWrap: "wrap", gap: "20px"}}>
        //                 {selectedComponent?.map((componentName, index) => {
        //                     const ComponentToRender = componentMap[componentName];
        //                     return ComponentToRender ? (
        //                         <div key={index}>{ComponentToRender}</div>
        //                     ) : null;
        //                 })}
        //             </div>
        //         )}
        //     </Droppable>
        // </DragDropContext>
    )

}

export default EditDisplayComponents