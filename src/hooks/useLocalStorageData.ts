import { ComponentType } from "../types"

export const useLocalStorageData = () => {
    const localStoragedataString = localStorage.getItem("selecteditem")
    let localStoragedata:ComponentType[] = []
    if(localStoragedataString){
        localStoragedata = JSON.parse(localStoragedataString)
    }

    return localStoragedata;
}