import { useEffect, useState } from "react"
import ThemeThree from "../components/themethree/ThemeThree"
import ToDo from "../components/todo/ToDo"
import { useLocalStorageData } from "../hooks/useLocalStorageData"
import ThemeOne from "../components/themeone/ThemeOne"

const Selecttheme = () => {
    const [localData, setLocalData] = useState<any[]>([]);
    const locaStorageData = useLocalStorageData();  // Assume this fetches the local storage data
    
    useEffect(() => {
        setLocalData(locaStorageData);  // Ensure the data is set
    }, [locaStorageData]); // When local storage data changes, re-run the effect

    return (
        <>
          {localData.map((comp) => {
            switch (comp.theme_id) {
              case 1:
                return (
                  <ThemeOne
                    key={comp.user_table_id} // Add key prop
                    table_name={comp.table_name} 
                    urlname={convertToUnderscoreCase(comp.table_name)} 
                  />
                );
              case 2:
                return (
                    <ThemeThree 
                      key={comp.user_table_id} // Add key prop
                      table_name={comp.table_name} 
                      urlname={convertToUnderscoreCase(comp.table_name)}
                    />
                );
                
              case 3:
                console.log("Theme 3", comp.table_name);
                break;
              default:
                return null;
            }
          })}
        </>
      );
      
}

function convertToUnderscoreCase(str:string) {
    return str
      .split(' ')            // Split the string into words based on spaces
      .join('_')             // Join the words with underscores
      .toLowerCase();        // Convert the entire string to lowercase
      + '_table';
}
export default Selecttheme