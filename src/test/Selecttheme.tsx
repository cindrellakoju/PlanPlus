import { JSX, useEffect, useState } from "react"
import Schedule from "../components/schedule/Schedule"
import ThemeThree from "../components/themethree/ThemeThree"
import ToDo from "../components/todo/ToDo"
import { useLocalStorageData } from "../hooks/useLocalStorageData"
import Dummy from "./dummy"

const Selecttheme = () => {
    const [localData, setLocalData] = useState<any[]>([]);
    const locaStorageData = useLocalStorageData();  // Assume this fetches the local storage data
    
    useEffect(() => {
        console.log("Render");
        setLocalData(locaStorageData);  // Ensure the data is set
    }, []); // When local storage data changes, re-run the effect

    // console.log("local Data:",locaStorageData)
    return (
        <>
        {/* <ThemeThree table_name = {"Note for Self"} urlname = {"note_for_self"}/> */}
        {
            locaStorageData.map((comp) => {
                console.log("Table Name:",comp.table_name,"Theme ID:",comp.theme_id)
        
                switch(comp.theme_id){
                    case 1:
                        // <ToDo/>
                        return(
                            // <Dummy tablename={comp.table_name} urlname={ convertToUnderscoreCase(comp.table_name)} />
                            <ToDo table_name={comp.table_name} urlname = {convertToUnderscoreCase(comp.table_name)}/>
                            
                            // <TodoApp themename= {comp.table_name} urlname={convertToUnderscoreCase(comp.table_name)}/>
                        )
                        break;
                        case 2:
                            return(
                                <ThemeThree table_name={comp.table_name} urlname={ convertToUnderscoreCase(comp.table_name)} />
                            // <Schedule table_name = {comp.table_name} urlname = {convertToUnderscoreCase(comp.table_name)}/>
                        )
                        break;
                    case 3:
                        console.log("Theme 3", comp.table_name)
                        break;
                }
            })
        }
        </>
    )
}

function convertToUnderscoreCase(str:string) {
    return str
      .split(' ')            // Split the string into words based on spaces
      .join('_')             // Join the words with underscores
      .toLowerCase();        // Convert the entire string to lowercase
      + '_table';
}
export default Selecttheme