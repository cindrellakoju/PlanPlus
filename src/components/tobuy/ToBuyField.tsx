import React, { useState } from "react";
import ComponentWidthHeight from "../../utils/ComponentWidthHeight";
import { ChooseField } from "../allrequire/ChooseField";
import { Button } from "../allrequire/Button";

const ToBuyField : React.FC = () =>{
    const {inside_temp_height} = ComponentWidthHeight("ToBuy");
      const   [selectfield,setSelectField] = useState<string>("") 

      const handlefieldchange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectField(event.target.value);
      };

    return(
        <div className="buylistfieldcontainer" >
            <ChooseField/>
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
            <Button/>
        </div>
    )
}

export default ToBuyField