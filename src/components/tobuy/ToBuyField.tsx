import React from "react";
import InputField from "../allrequire/InputField";

const ToBuyField : React.FC = () =>{
    return(
        <div className="buylistfieldcontainer">
            <div className="buylistfield">
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
            <InputField />

        </div>
    )
}

export default ToBuyField