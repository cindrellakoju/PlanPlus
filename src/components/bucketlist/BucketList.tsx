import React from "react";
import BucketListField from "./BucketListField";
import "../../styles/BucketList.css"
import ComponentWidthHeight from "../../utils/ComponentWidthHeight";

const BucketList:React.FC = () =>{
    const {max_height,max_width, editHWMode,edit_height , edit_width} = ComponentWidthHeight('Bucket List')
    return(
        <div 
            className="bucketlistcontainer" 
            style={editHWMode ? {height: edit_height, width: edit_width} : { height: max_height, width: max_width }}
        >
            <h1>Bucket List</h1>
            <BucketListField/>
        </div>
    )
}

export default BucketList;