import React from "react"
import "../../styles/ToBuy.css"
import ToBuyField from "./ToBuyField"
import ComponentWidthHeight from "../../utils/ComponentWidthHeight"

const ToBuy:React.FC = () =>{
    const {max_height,max_width, editHWMode, edit_height, edit_width} = ComponentWidthHeight("ToBuy");
    return(
        <div style={editHWMode? {height: edit_height, width: edit_width} :{ height: max_height, width: max_width}} className="tobuycontainer">
            <h1>To Buy List</h1>
            <ToBuyField/>
        </div>
    )
}

export default ToBuy