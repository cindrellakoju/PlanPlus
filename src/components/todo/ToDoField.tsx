import React from "react"
import "../../styles/ToDo.css"
import InputField from "../allrequire/InputField";

const ToDoField:React.FC = () =>{
    return (
        <div className="todofield">
            <ul className="todolist">
                <li>To complete todo List</li>
                <li>To complete todo List</li>
                <li>To complete todo List</li>
                <li>To complete todo List</li>
                <li>To complete todo List</li>
                <li>To complete todo List</li>
                <li>To complete todo List</li>
                <li>To complete todo List</li>
                <li>To complete todo List</li>
                <li>To complete todo List</li>
                <li>To complete todo List</li>
            </ul>
            <InputField/>
        </div>
    )
}

export default ToDoField;