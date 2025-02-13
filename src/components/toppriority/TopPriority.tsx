import React from "react";
import "../../styles/TopPriority.css"
import DisplayField from "./DisplayField";

const TopPriority:React.FC = () =>{
    return(
        <div className="prioritycontainer">
            <h1>Top Priority</h1>
            <DisplayField/>
        </div>
    )
}

export default TopPriority;