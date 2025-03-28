import React from "react";
import "../../styles/ToDo.css"
import ToDoField from "./ToDoField";
import ComponentWidthHeight from "../../utils/ComponentWidthHeight";

interface ToDoProps {
    table_name?: string; // Make table_name optional
    urlname?: string
  }
  
  const ToDo: React.FC<ToDoProps> = ({ table_name,urlname }) => {
    const { max_width, max_height,editHWMode, edit_height, edit_width } = ComponentWidthHeight("To Do List");

    return(
        <div style={editHWMode? {height: edit_height, width: edit_width} : { height: max_height, width : max_width }} className="todocontainer">
            <h1>{table_name}</h1>
            <ToDoField urlname = {urlname}/>
        </div>
    )
}

export default ToDo;