import React from "react"
import DateField from "../smallcomponent/DateField"
import DayField from "../smallcomponent/DayField"
import QuoteField from "../smallcomponent/QuoteField"

function Header() {
    const style: React.CSSProperties ={
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-evenly",
        flexWrap: 'wrap',
    }
  return (
    <div style={style}>
        <DateField />
        <QuoteField/>
        <DayField/>
    </div>
  )
}

export default Header