import React from "react";
import "../../styles/ToDo.css"
import ToDoField from "./ToDoField";
import ComponentWidthHeight from "../../utils/ComponentWidthHeight";

const ToDo:React.FC = () =>{
    const { max_width, max_height,editHWMode } = ComponentWidthHeight("ToDo");

    return(
        <div style={editHWMode? {} : { maxHeight: max_height, maxWidth: max_width }} className="todocontainer">
            <h1>To Do List</h1>
            <ToDoField/>
        </div>
    )
}

export default ToDo;