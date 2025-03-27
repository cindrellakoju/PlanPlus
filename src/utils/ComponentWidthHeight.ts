import { useContext } from "react"
import { MyContext } from "../context/Component.context"
import { useLocalStorageData } from "../hooks/useLocalStorageData";

const ComponentWidthHeight= (funcName: string) => {
    const context = useContext(MyContext)
    if(!context){
        console.log(`Wrap Component ${funcName} by MyProvider`);
    };

    const localStorageData = useLocalStorageData()
    // console.log("SDSD", context?.components)
    const componentName = localStorageData.find(component => component.table_name === `${funcName}`);
    // console.log("FRom i=utile:", componentName?.width)
    const editComponent = context?.editHeightWidth.find(component => component.table_name === `${funcName}`)
    const max_width = componentName?.width !== 0 ? `${componentName?.width}px`: "300px";
    const max_height = componentName?.height !== 0 ? `${componentName?.height}px`: "320px";
    const editHWMode = context?.edithwmode;
    const edit_width = editComponent?.width !== 0 ? `${editComponent?.width}px`: "300px";
    const edit_height = editComponent?.height !== 0 ? `${editComponent?.height}px`: "500px";
    const inside_temp_height = editHWMode ? `${parseInt(edit_height) - 200}px`: `${parseInt(max_height) - 200}px`

    return { max_width,max_height,inside_temp_height, editHWMode, edit_width, edit_height}
}

export default ComponentWidthHeight;