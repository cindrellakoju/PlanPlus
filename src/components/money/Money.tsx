import React from "react";
import MoneyField from "./MoneyField";
import "../../styles/Money.css"
import ComponentWidthHeight from "../../utils/ComponentWidthHeight";

const Money:React.FC = () =>{
    const {max_width,max_height, editHWMode, edit_height, edit_width} = ComponentWidthHeight("Money Transaction")
    return(
        <div className="moneycontainer" style={editHWMode ?  {height: edit_height, width: edit_width}:{ maxHeight: max_height, width: max_width}}>
            <h1>Money Transaction Management</h1>
            <MoneyField/>
        </div>
    )
}

export default Money;