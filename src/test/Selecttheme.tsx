import { useContext, useEffect, useState } from "react"
import ThemeThree from "../components/themethree/ThemeThree"
import { useLocalStorageData } from "../hooks/useLocalStorageData"
import ThemeOne from "../components/themeone/ThemeOne"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { EditThemeContext } from "../context/EditThemeContext";

const Selecttheme = () => {
    const editcontext = useContext(EditThemeContext)
    if(!editcontext){
      throw new Error("Wrap Selecttheme within EditThemeProvider")
    } 
    const [localData, setLocalData] = useState<any[]>([]);
    const locaStorageData = useLocalStorageData();  // Assume this fetches the local storage data
    
    useEffect(() => {
        setLocalData(locaStorageData);  // Ensure the data is set
    }, [locaStorageData]); // When local storage data changes, re-run the effect


    console.log("Local Stoage data:",localData)

    const handleDragEnd = (result: DropResult) => {
      const { source, destination } = result;
      if (!destination) return;
  
      const reordered = Array.from(localData);
      const [moved] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, moved);
      setLocalData(reordered);
    };


    return editcontext.editPosition ? (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="themes" direction="horizontal">
          {(provided) => (
            <div
              className="theme-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ display: "flex",flexDirection: "row",flexWrap: "wrap" }}
            >
              {localData.map((comp, index) => (
                <Draggable key={comp.user_table_id} draggableId={comp.user_table_id.toString()} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      {renderTheme(comp, localData, setLocalData)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    ):(
      <>
      {localData.map((comp) => renderTheme(comp,localData, setLocalData))}
    </>
    )

      
}

function renderTheme(comp: any, localData: any[], setLocalData: React.Dispatch<React.SetStateAction<any[]>>) {
  const commonProps = {
    key: comp.user_table_id,
    table_name: comp.table_name,
    urlname: convertToUnderscoreCase(comp.table_name),
    height: comp.height,
    width: comp.width,
    id: comp.user_table_id,
    setLocalData,
    localData
  };

  switch (comp.theme_id) {
    case 1:
      return <ThemeOne {...commonProps} />;
    case 2:
      return <ThemeThree {...commonProps} />;
    case 3:
      console.log("Theme 3", comp.table_name);
      return null;
    default:
      return null;
  }
}

function convertToUnderscoreCase(str:string) {
    return str
      .split(' ')            // Split the string into words based on spaces
      .join('_')             // Join the words with underscores
      .toLowerCase();        // Convert the entire string to lowercase
      + '_table';
}
export default Selecttheme