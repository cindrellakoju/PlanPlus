import React from "react"
import { today_day_long } from "../../utils/formatDate"
import ScheduleField from "./ScheduleField"
import "../../styles/Schedule.css"
import ComponentWidthHeight from "../../utils/ComponentWidthHeight"
interface schedulrprops{
    table_name?: string,
    urlname ?: string
}
const Schedule:React.FC<schedulrprops>= ({ table_name,urlname }) =>{
    const {max_height,max_width,editHWMode, edit_height, edit_width}=ComponentWidthHeight("Schedule")
    return(
        <div className="schedulecontainer" style={editHWMode ?  {height: edit_height, width: edit_width} :{ height: max_height, width: max_width}}>
            {/* <h1></h1> */}
            <h1>{table_name} {table_name === "Schedule" ? `For ${today_day_long}` : ""}</h1>
            <ScheduleField/>
        </div>
    )
}

export default Schedule