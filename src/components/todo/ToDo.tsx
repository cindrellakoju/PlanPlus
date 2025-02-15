import React from "react";
import "../../styles/ToDo.css"
import ToDoField from "./ToDoField";

const ToDo:React.FC = () =>{
    return(
        <div className="todocontainer">
            <h1>To Do List</h1>
            <ToDoField/>
        </div>
    )
}

export default ToDo;