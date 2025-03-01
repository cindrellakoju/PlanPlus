import { useContext } from "react"
import { MyContext } from "../context/Component.context"

const ComponentWidthHeight= (funcName: string) => {
    const context = useContext(MyContext)
    if(!context){
        console.log(`Wrap Component ${funcName} by MyProvider`);
    };

    const componentName = context?.components.find(component => component.name === `${funcName}`);

    const max_width = componentName?.position_x !== 0 ? `${componentName?.position_x}px`: "300px";
    const max_height = componentName?.position_y !== 0 ? `${componentName?.position_y}px`: "320px";
    const inside_temp_height = `${parseInt(max_height) - 200}px`;

    return { max_width,max_height,inside_temp_height}
}

export default ComponentWidthHeight;