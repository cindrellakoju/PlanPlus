import { ComponentType } from "../types"

export const useLocalStorageData = () => {
    const localStoragedataString = localStorage.getItem("selecteditem")
    let localStoragedata:ComponentType[] = []
    if(localStoragedataString){
        localStoragedata = JSON.parse(localStoragedataString)
    }

    localStoragedata.sort((a, b) => a.orderindex - b.orderindex);

    console.log("LocalStorage",localStoragedata)
    return localStoragedata;
}