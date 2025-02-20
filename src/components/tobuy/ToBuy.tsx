import React from "react"
import "../../styles/ToBuy.css"
import ToBuyField from "./ToBuyField"

const ToBuy:React.FC = () =>{
    return(
        <div className="tobuycontainer">
            <h1>To Buy List</h1>
            <ToBuyField/>
        </div>
    )
}

export default ToBuy