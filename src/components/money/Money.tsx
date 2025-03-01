import React from "react";
import MoneyField from "./MoneyField";
import "../../styles/Money.css"
import ComponentWidthHeight from "../../utils/ComponentWidthHeight";

const Money:React.FC = () =>{
    const {max_width,max_height} = ComponentWidthHeight("Money")
    return(
        <div className="moneycontainer" style={{ maxHeight: max_height, width: max_width}}>
            <h1>Money Transaction Management</h1>
            <MoneyField/>
        </div>
    )
}

export default Money;