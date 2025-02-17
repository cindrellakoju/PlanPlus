import React from "react";
import MoneyField from "./MoneyField";
import "../../styles/Money.css"

const Money:React.FC = () =>{
    return(
        <div className="moneycontainer">
            <h1>Money Transaction Management</h1>
            <MoneyField/>
        </div>
    )
}

export default Money;