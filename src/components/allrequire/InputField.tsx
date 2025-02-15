import React from "react";
import "./InputField.css"

const InputField:React.FC = () =>{
    return(
        <div className="InputField">
            <div className="inputs">
                <input type="text"/>
            </div>
            <i className='bx bx-send'></i>
        </div>
    )
}

export default InputField