import { formatDate } from "../../utils/formatDate"
import "../../styles/Header.css"
import React from "react"

interface DateFieldProps{
  customDate?: Date
}


const DateField:React.FC<DateFieldProps> =({customDate}) => {
  const date = customDate? customDate: new Date()
  return (
    <div className="datecontainer">
        {/* <p>{formatDate(new Date(2003,8,13))}</p> */}
        <p>{formatDate(date)}</p>
    </div>
  )
}

export default DateField