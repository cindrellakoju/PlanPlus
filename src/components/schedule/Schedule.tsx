import React from "react"
import { today_day_long } from "../../utils/formatDate"
import ScheduleField from "./ScheduleField"
import "../../styles/Schedule.css"
import ComponentWidthHeight from "../../utils/ComponentWidthHeight"

const Schedule:React.FC= () =>{
    const {max_height,max_width}=ComponentWidthHeight("Schedule")
    return(
        <div className="schedulecontainer" style={{ maxHeight: max_height, width: max_width}}>
            <h1>Schedule for {today_day_long}</h1>
            <ScheduleField/>
        </div>
    )
}

export default Schedule