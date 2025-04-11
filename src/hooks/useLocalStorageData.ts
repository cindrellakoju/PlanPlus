import { useContext, useEffect, useState } from "react";
import { ComponentType } from "../types";
import { MyContext } from "../context/Component.context";

export const useLocalStorageData = () => {
    const context = useContext(MyContext)
    const [localStoragedata, setLocalStoragedata] = useState<ComponentType[]>([]);

    useEffect(() => {
        const localStoragedataString = localStorage.getItem("selecteditem");
        let localStoragedata: ComponentType[] = [];
        
        if (localStoragedataString) {
            localStoragedata = JSON.parse(localStoragedataString);
        }
        
        // Sort the data before setting it to state
        localStoragedata.sort((a, b) => a.orderindex - b.orderindex);
        
        setLocalStoragedata(localStoragedata); // Update state
    }, [context?.components]);

    return localStoragedata;
};
