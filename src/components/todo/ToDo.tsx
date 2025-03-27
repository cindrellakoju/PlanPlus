import React from "react";
import "../../styles/ToDo.css"
import ToDoField from "./ToDoField";
import ComponentWidthHeight from "../../utils/ComponentWidthHeight";

const ToDo:React.FC = () =>{
    const { max_width, max_height,editHWMode, edit_height, edit_width } = ComponentWidthHeight("To Do List");

    return(
        <div style={editHWMode? {height: edit_height, width: edit_width} : { height: max_height, width : max_width }} className="todocontainer">
            <h1>To Do List</h1>
            <ToDoField/>
        </div>
    )
}

export default ToDo;