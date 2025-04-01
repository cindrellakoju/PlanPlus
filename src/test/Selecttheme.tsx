import Schedule from "../components/schedule/Schedule"
import ThemeThree from "../components/themethree/ThemeThree"
import ToDo from "../components/todo/ToDo"
import { useLocalStorageData } from "../hooks/useLocalStorageData"
import TodoApp from "./Themeone"

const Selecttheme = () => {
    const locaStorageData = useLocalStorageData()
    


    // console.log("local Data:",locaStorageData)
    return (
        <>
        <ThemeThree table_name = {"Note for Self"} urlname = {"note_for_self"}/>
        {
            locaStorageData.map((comp) => {
                console.log("Table Name:",comp.table_name,"Theme ID:",comp.theme_id)
        
                switch(comp.theme_id){
                    case 1:
                        // <ToDo/>
                        return(
                            <ToDo table_name={comp.table_name} urlname = {convertToUnderscoreCase(comp.table_name)}/>

                            // <TodoApp themename= {comp.table_name} urlname={convertToUnderscoreCase(comp.table_name)}/>
                        )
                        break;
                    case 2:
                        return(
                            <Schedule table_name = {comp.table_name} urlname = {convertToUnderscoreCase(comp.table_name)}/>
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