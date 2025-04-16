import { useContext, useEffect, useState } from "react"
import ThemeThree from "../components/themethree/ThemeThree"
import { useLocalStorageData } from "../hooks/useLocalStorageData"
import ThemeOne from "../components/themeone/ThemeOne"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { EditThemeContext } from "../context/EditThemeContext";
import axios from "axios";
import { useUserInfo } from "../hooks/useUserInfo";
import { compareLocalStorageData } from "../utils/compareLocalStorageData";

const Selecttheme= () => {
  const [editeachtable, setEditEachTable] = useState<boolean>(false);
  const [themeid, setThemeId] = useState<number>(2)
  const [addcheckbox, setAddCheckBox] = useState<boolean>(false);
  const [displaycolname, setDisplayColname] = useState<boolean>(true);
  const [bgforhead, setBgForHead] = useState<boolean>(true);
  const [tablemargin, setTableMargin] = useState<boolean>(false);

  const {userId , backend_url} = useUserInfo()

  const editcontext = useContext(EditThemeContext)
  if(!editcontext){
    throw new Error("Wrap Selecttheme within EditThemeProvider")
  } 
  const [localData, setLocalData] = useState<any[]>([]);
  const locaStorageData = useLocalStorageData();  // Assume this fetches the local storage data
  
  useEffect(() => {
    setLocalData(locaStorageData);  // Ensure the data is set
  }, [locaStorageData]); // When local storage data changes, re-run the effect

  console.log("LocalData:",localData)
      
  useEffect(() => {
    if (editcontext.savemode || (editcontext.savemode && editcontext.editPosition)) {
      // Create an array of update requests (PUT requests)
      const updateRequests = localData.map((comp) => {
        return axios
          .put(`${backend_url}/user/updatetable/${userId}`, comp) // Send PUT request
          .then((response) => {
            // If PUT is successful
            console.log(
              "✅ Successfully updated table with user_table_id:",
              comp.user_table_id,
              "→ Response:",
              response.data
            );
            // Call compareLocalStorageData only after successful PUT
            compareLocalStorageData(comp);
            return response;
          })
          .catch((error) => {
            // If PUT fails
            console.error("❌ Error updating user_table_id:", comp.user_table_id, error);
          });
      });
  
      // Wait for all PUT requests to complete
      Promise.all(updateRequests)
        .then(() => {
          // Show success message after all requests succeed
          alert("✅ All tables updated successfully!");
        })
        .catch(() => {
          // If any PUT request fails
          alert("⚠️ Some updates failed. Check console for details.");
        });
    }
  }, [editcontext.savemode, editcontext.editPosition]);
  
    


    const handleDragEnd = (result: DropResult) => {
      const { source, destination } = result;
      if (!destination) return;
  
      if(destination.index === source.index) return;
      
      const reordered = Array.from(localData);
      const [removed] = reordered.splice(source.index, 1);
      // const [moved] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);

      const updatedData = reordered.map((comp,index) => ({
        ...comp,
        orderindex : index + 1,
      }))
      setLocalData(updatedData);
    };

    useEffect(() => {
      setLocalData(locaStorageData)
    },[editcontext.editPosition])

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
              {localData.map ((comp, index)  => (
                <Draggable key={comp.user_table_id} draggableId={comp.user_table_id.toString()} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      {renderTheme(comp, localData, setLocalData,setEditEachTable, themeid,addcheckbox,  displaycolname, bgforhead, tablemargin)}
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
        {
          editcontext.editHeightWidth
            ? localData.map((comp) =>
                renderTheme(comp, localData, setLocalData, setEditEachTable, themeid, addcheckbox, displaycolname, bgforhead, tablemargin)
              )
            : locaStorageData.map((comp) =>
                renderTheme(comp, localData, setLocalData, setEditEachTable, themeid, addcheckbox, displaycolname, bgforhead, tablemargin)
              )
        }
      </>
    )      

}
function renderTheme(
  comp: any,
  localData: any[],
  setLocalData: React.Dispatch<React.SetStateAction<any[]>>,
  setEditEachTable: React.Dispatch<React.SetStateAction<boolean>>,
  themeid : number,
  addcheckbox : boolean,
  displaycolname : boolean,
  bgforhead : boolean, 
  tablemargin : boolean
) {
  const key = comp.user_table_id;

  const commonProps = {
    table_name: comp.table_name,
    urlname: convertToUnderscoreCase(comp.table_name),
    height: comp.height,
    width: comp.width,
    id:  comp.user_table_id,
    checkbox: comp.checkbox === 1,
    tablemargin: comp.table_margin === 1,
    backgroundforhead: comp.bg_for_header === 1,
    displaycolname: comp.col_name === 1,
    setEditEachTable : setEditEachTable,
    addcheckbox : addcheckbox,
    editdisplaycolname : displaycolname,
    editbgforhead : bgforhead,
    edittablemargin: tablemargin,
    setLocalData,
    localData,
    themeid : themeid,
  };

  switch (comp.theme_id ) {
    case 1:
      return <ThemeOne key={key} {...commonProps} />;
    case 2:
      return <ThemeThree key={key} {...commonProps} />;
    case 3:
      console.log("Theme 3", comp.table_name);
      return null;
    default:
      return null;
  }

}

interface SelectDummythemeProps{
  themeid : number,
  table_name : string,
  checkbox : boolean,
  tablemargin : boolean,
  backgroundforhead : boolean,
  displaycolname : boolean,
  colnames : string[],
  creatingtable : boolean
}
export const DummyrenderTheme: React.FC<SelectDummythemeProps> = ({ themeid, table_name, checkbox, tablemargin , backgroundforhead, displaycolname, colnames, creatingtable}) => {
  const commonProps = {
    table_name: table_name,
    height: 465,
    width: 465,
    checkbox: checkbox,
    tablemargin: tablemargin,
    backgroundforhead: backgroundforhead,
    displaycolname: displaycolname,
    colnames : colnames,
    creatingtable: creatingtable,
    themeid : themeid
  };
  switch (themeid) {
    case 1:
      return <ThemeOne key={themeid} {...commonProps} />;
    case 2:
      return <ThemeThree key={themeid} {...commonProps} />;
    default:
      return null;
  }
};


function convertToUnderscoreCase(str:string) {
    return str
      .split(' ')            // Split the string into words based on spaces
      .join('_')             // Join the words with underscores
      .toLowerCase();        // Convert the entire string to lowercase
      + '_table';
}
export default Selecttheme