import React from "react";
import Header from "../components/layoutcomponent/Header";
import HomePageEdit from "./HomePageEdit";
import { MyProvider } from "../context/Component.context";

const FrontPageEdit : React.FC = () =>{
    return(
        <>
            <Header/>
            <HomePageEdit/>
        </>
    )
}

export default FrontPageEdit;