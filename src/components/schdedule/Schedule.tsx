import React from "react"
import { today_day } from "../../utils/formatDate"

const Schedule:React.FC= () =>{
    return(
        <div className="schedulecontainer">
            <h1>Schedule for {today_day}</h1>
        </div>
    )
}

export default Schedule