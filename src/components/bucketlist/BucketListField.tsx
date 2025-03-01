import React from "react";
import InputField from "../allrequire/InputField";
import ComponentWidthHeight from "../../utils/ComponentWidthHeight";
import { ChooseField } from "../allrequire/ChooseField";
import { Button } from "../allrequire/Button";

const BucketListField:React.FC = () =>{
    const {inside_temp_height} = ComponentWidthHeight("BucketList")
    return(
        <div className="bucketlistfieldcontainer">
            <ChooseField/>
            <div className="bucketlistfields" style={{ maxHeight: inside_temp_height}}>
                <div className="field">
                    <input type="checkbox" id="bucketlist1" name="bucketlist1"  value="bucketlist" />
                    <label htmlFor="bucketlist1">To visit AnnapurnaBase Camp </label>                    
                </div>
                <div className="field">
                    <input type="checkbox" id="bucketlist1" name="bucketlist1"  value="bucketlist" />
                    <label htmlFor="bucketlist1">To visit AnnapurnaBase Camp </label>                    
                </div>
                <div className="field">
                    <input type="checkbox" id="bucketlist1" name="bucketlist1"  value="bucketlist" />
                    <label htmlFor="bucketlist1">To visit AnnapurnaBase Camp  sfds fs dfbsfkbsdf fbb f dbsfbksf sdfsdfbsdf sb fbsf s fsbfiudsf s </label>                    
                </div>
                <div className="field">
                    <input type="checkbox" id="bucketlist1" name="bucketlist1"  value="bucketlist" />
                    <label htmlFor="bucketlist1">To visit AnnapurnaBase Camp </label>                    
                </div>
                <div className="field">
                    <input type="checkbox" id="bucketlist1" name="bucketlist1"  value="bucketlist" />
                    <label htmlFor="bucketlist1">To visit AnnapurnaBase Camp </label>                    
                </div>
                <div className="field">
                    <input type="checkbox" id="bucketlist1" name="bucketlist1"  value="bucketlist" />
                    <label htmlFor="bucketlist1">To visit AnnapurnaBase Camp </label>                    
                </div>
                <div className="field">
                    <input type="checkbox" id="bucketlist1" name="bucketlist1"  value="bucketlist" />
                    <label htmlFor="bucketlist1">To visit AnnapurnaBase Camp </label>                    
                </div>
                <div className="field">
                    <input type="checkbox" id="bucketlist1" name="bucketlist1"  value="bucketlist" />
                    <label htmlFor="bucketlist1">To visit AnnapurnaBase Camp </label>                    
                </div>
                <div className="field">
                    <input type="checkbox" id="bucketlist1" name="bucketlist1"  value="bucketlist" />
                    <label htmlFor="bucketlist1">To visit AnnapurnaBase Camp </label>                    
                </div>
                <div className="field">
                    <input type="checkbox" id="bucketlist1" name="bucketlist1"  value="bucketlist" />
                    <label htmlFor="bucketlist1">To visit AnnapurnaBase Camp </label>                    
                </div>
            </div>
            <Button/>
        </div>
    )
}

export default BucketListField;