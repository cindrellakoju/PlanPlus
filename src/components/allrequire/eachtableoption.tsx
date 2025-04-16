import React, { useState } from "react"

interface EditEachTableProps {
    themeid : number,
    tablename : string,
    localData: any[] | undefined,
    setLocalData: React.Dispatch<React.SetStateAction<any[]>> | undefined,
    addcheckbox : boolean | undefined
}
export const EachTableEditOption:React.FC<EditEachTableProps> = ({tablename,themeid, localData, setLocalData, addcheckbox}) => {
        // const [themeid,setThemeId] = useState<number>(1)
        const [checkbox,setCheckBox] = useState<boolean>(false)
        const [tablemargin, setTableMargin] = useState<boolean>(false)
        const [backgroundforhead,setBackgroundForHead] = useState<boolean>(false)
        const [displacolname,setDisplayColname] = useState<boolean>(false)

        console.log("Localdaa:",localData)
        // console.log("Localdaa:",localData)
        
        const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedThemeId = parseInt(e.target.value); // Convert to number
        
            if(localData && setLocalData){
                const updatedData = localData.map((comp) => {
                    if (tablename === comp.table_name) {
                        return { ...comp, theme_id: selectedThemeId }; // Return a new object with updated theme_id
                    }
                    return comp;
                });

                setLocalData(updatedData); // Trigger state update
            }
        
        };

        const handleCheckbox = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedcheckboxval = e.target.value === "true" ? 1 : 0;

            if(localData && setLocalData){
                const updatedData = localData.map((comp) => {
                    if (tablename === comp.table_name) {
                        return { ...comp, checkbox: selectedcheckboxval }; // Return a new object with updated theme_id
                    }
                    return comp;
                });

                setLocalData(updatedData); // Trigger state update
            }
            console.log("checbox:",selectedcheckboxval)
        } 
        
    return(
        <div className="settings-panel">
            <div className="setting-item">
            <label htmlFor="checkbox">Check Box</label>
            <select
            id="checkbox"
            value={
                localData?.find((comp) => comp.table_name === tablename)?.checkbox?.toString() ?? ""
            }
            onChange={handleCheckbox}
            >

                <option value="false">false</option>
                <option value="true">true</option>
            </select>
            </div>

            <div className="setting-item">
            <label htmlFor="tablemargin">Table Margin</label>
            <select id="tablemargin" value={tablemargin.toString()} onChange={(e) => setTableMargin(e.target.value === "true")}>
                <option value="false">false</option>
                <option value="true">true</option>
            </select>
            </div>

            <div className="setting-item">
            <label htmlFor="bgforhead">Background for Header</label>
            <select id="bgforhead" value={backgroundforhead.toString()} onChange={(e) => setBackgroundForHead(e.target.value === "true")}>
                <option value="false">false</option>
                <option value="true">true</option>
            </select>
            </div>

            <div className="setting-item">
            <label htmlFor="displaycolname">Display Column Name</label>
            <select id="displaycolname" value={displacolname.toString()} onChange={(e) => setDisplayColname(e.target.value === "true")}>
                <option value="false">false</option>
                <option value="true">true</option>
            </select>
            </div>

            <div className="setting-item">
            <label htmlFor="theme">Select Theme</label>
            <select id="theme" value={themeid}  onChange={handleThemeChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            </div>
        </div>
    )
}