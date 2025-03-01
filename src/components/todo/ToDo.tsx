import React, { useContext} from "react";
import "../../styles/ToDo.css"
import ToDoField from "./ToDoField";
import { MyContext } from "../../context/Component.context";

const ToDo:React.FC = () =>{
    const context = useContext(MyContext);

    if(!context){
    console.log("Wrap ToDoField inside MyProvider")
    }

    const componentName = context?.components.find(component => component.name === "ToDo");
    const max_width = componentName?.position_x !== undefined ? `${componentName.position_x}px` : "300px";
    const max_height = componentName?.position_y !== undefined ? `${componentName?.position_y}px` : "320px";

    return(
        <div style={{ maxHeight: max_height, maxWidth: max_width }} className="todocontainer">
            <h1>To Do List</h1>
            <ToDoField/>
        </div>
    )
}

export default ToDo;