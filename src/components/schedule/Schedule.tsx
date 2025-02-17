import React from "react"
import { today_day_long } from "../../utils/formatDate"
import ScheduleField from "./ScheduleField"
import "../../styles/Schedule.css"

const Schedule:React.FC= () =>{
    return(
        <div className="schedulecontainer">
            <h1>Schedule for {today_day_long}</h1>
            <ScheduleField/>
        </div>
    )
}

export default Schedule