import React, { useState } from "react";
import InputField from "../allrequire/InputField";
import ComponentWidthHeight from "../../utils/ComponentWidthHeight";

const ToBuyField : React.FC = () =>{
    const {inside_temp_height} = ComponentWidthHeight("ToBuy");
      const   [selectfield,setSelectField] = useState<string>("") 

      const handlefieldchange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectField(event.target.value);
      };

    return(
        <div className="buylistfieldcontainer" >
            <div className="chooseoption">
                <label htmlFor="field">Choose Field:  </label>
                <select id="field" onChange={handlefieldchange}>
                    <option value="add">Add</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                    <option value="completed">Mark as Completed</option>
                </select>
            </div>
            <div className="buylistfields" style={{ maxHeight: inside_temp_height}}>
                <div className="field">
                    <input type="checkbox" id="buylist1" name="buylist1" value="buylist" />
                    <label htmlFor="buylist">gaming pc</label>
                </div>
                <div className="field">
                    <input type="checkbox" id="buylist1" name="buylist1" value="buylist" />
                    <label htmlFor="buylist">gaming pc</label>
                </div>
                <div className="field">
                    <input type="checkbox" id="buylist1" name="buylist1" value="buylist" />
                    <label htmlFor="buylist">gaming pc</label>
                </div>
                <div className="field">
                    <input type="checkbox" id="buylist1" name="buylist1" value="buylist" />
                    <label htmlFor="buylist">gaming pc</label>
                </div>
                <div className="field">
                    <input type="checkbox" id="buylist1" name="buylist1" value="buylist" />
                    <label htmlFor="buylist">gaming pc</label>
                </div>

            </div>
            <button>Send</button>
        </div>
    )
}

export default ToBuyField