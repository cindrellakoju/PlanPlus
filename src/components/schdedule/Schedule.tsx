import React from "react"
import { today_day_long } from "../../utils/formatDate"

const Schedule:React.FC= () =>{
    return(
        <div className="schedulecontainer">
            <h1>Schedule for {today_day_long}</h1>
        </div>
    )
}

export default Schedule