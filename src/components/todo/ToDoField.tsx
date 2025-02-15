import React from "react"
import "../../styles/ToDo.css"
import InputField from "../allrequire/InputField";

const ToDoField:React.FC = () =>{
    return (
        <div className="todofield">
            <div className="todolist">
                <ul>
                    <li>To complete todo List lndcscs csks cs dss fdsfsbf f sfbfs </li>
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
            </div>
            <InputField/>
        </div>
    )
}

export default ToDoField;