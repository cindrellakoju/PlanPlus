import React from "react";
import BucketListField from "./BucketListField";
import "../../styles/BucketList.css"

const BucketList:React.FC = () =>{
    return(
        <div className="bucketlistcontainer">
            <h1>Bucket List</h1>
            <BucketListField/>
        </div>
    )
}

export default BucketList;