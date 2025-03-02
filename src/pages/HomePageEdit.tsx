import React, { useContext } from "react";
import { MyContext } from "../context/Component.context";

const HomePageEdit:React.FC = () => {
    const context = useContext(MyContext);

    if(!context){
        console.log("Wrap the HomePageEdit by MyProvider")
    }
    console.log("Selected item",context?.selectedComponents, context?.components);
    return(
        <div>
            <button>Save</button>
            <div></div>
        </div>
    )
}

export default HomePageEdit;