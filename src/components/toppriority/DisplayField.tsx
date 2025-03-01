import React from "react";
import ComponentWidthHeight from "../../utils/ComponentWidthHeight";
import { ChooseField } from "../allrequire/ChooseField";

const DisplayField:React.FC = () =>{
    const {inside_temp_height}= ComponentWidthHeight("TopPriority")
    return(
        <div className="displayfieldcontainer">
            <ChooseField/>
            <div className="displayfields" style={{ height: inside_temp_height}}>
                <div className="field">
                    <input type="checkbox" id="tp1"/>
                    <label htmlFor="tp1">To complete the top priority field</label>
                </div>
                <div className="field">
                    <input type="checkbox" id="tp1"/>
                    <label htmlFor="tp1">To complete the top priority field</label>
                </div>
                <div className="field">
                    <input type="checkbox" id="tp1"/>
                    <label htmlFor="tp1">To complete the top priority field</label>
                </div>
                <div className="field">
                    <input type="checkbox" id="tp1"/>
                    <label htmlFor="tp1">To complete the top priority field</label>
                </div>
                <div className="field">
                    <input type="checkbox" id="tp1"/>
                    <label htmlFor="tp1">To complete the top priority field</label>
                </div>
                <div className="field">
                    <input type="checkbox" id="tp1"/>
                    <label htmlFor="tp1">To complete the top priority field</label>
                </div>
                <div className="field">
                    <input type="checkbox" id="tp1"/>
                    <label htmlFor="tp1">To complete the top priority field</label>
                </div>

            </div>
            <div className="buttons">
                <button>Send</button>
                <button>Add</button>
            </div>
        </div>
    )
}

export default DisplayField;