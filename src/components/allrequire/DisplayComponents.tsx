import React, { JSX, useContext } from "react"
import { MyContext } from "../../context/selectedComponent"
import TopPriority from "../toppriority/TopPriority"
import ToDo from "../todo/ToDo"
import BucketList from "../bucketlist/BucketList"
import Schedule from "../schedule/Schedule"
import Money from "../money/Money"
import ToBuy from "../tobuy/ToBuy"

const componentMap: { [key : string] : JSX.Element} = {
    TopPriority: <TopPriority />,
    ToDo: <ToDo />,
    BucketList: <BucketList />,
    Schedule: <Schedule />,
    Money: <Money />,
    ToBuy: <ToBuy />,
}
const DisplayComponents:React.FC = () => {
    const context = useContext(MyContext)

    if(!context){
        console.log("DisplayComponents should be wrapper within MyProvider");
    }

    const selectedComponent = context?.selectedComponents
    return(
        <div style={{ display: "flex" , flexDirection: "row", flexWrap: "wrap", gap: "20px"}}>
            {selectedComponent?.map((componentName, index) => {
                const ComponentToRender = componentMap[componentName];
                return ComponentToRender ? (
                    <div key={index}>{ComponentToRender}</div>
                ) : null;
            })}
        </div>
    )

}

export default DisplayComponents