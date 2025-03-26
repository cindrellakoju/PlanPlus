import React, { JSX,useEffect,useState } from "react";
import TopPriority from "../toppriority/TopPriority";
import ToDo from "../todo/ToDo";
import BucketList from "../bucketlist/BucketList";
import Schedule from "../schedule/Schedule";
import Money from "../money/Money";
import ToBuy from "../tobuy/ToBuy";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useLocalStorageData } from "../../hooks/useLocalStorageData";
import { compareLocalStorageData } from "../../utils/compareLocalStorageData";
import axios from "axios";

// Mapping of component names to actual JSX elements
const componentMap: { [key: string]: JSX.Element } = {
  TopPriority: <TopPriority />,
  ToDoList: <ToDo />,
  BucketList: <BucketList />,
  Schedule: <Schedule />,
  MoneyTransaction: <Money />,
  ToBuy: <ToBuy />,
};

const EditDisplayComponents: React.FC = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const storedUser = localStorage.getItem('userdetail');
  const [userid, setUserId]  = useState<{ user_id:string} | null>(null);

  useEffect(() => {
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser); // Store parsed user info in state
    }
  }, [storedUser]);

  const userId = userid?.user_id

  const localStorageData = useLocalStorageData(); // Fetch data from localStorage

  const [dummyData, setDummyData] = useState(localStorageData); // Local state for managing the temporary data

  useEffect(() => {
    setDummyData(localStorageData);
  }, [localStorageData]);
  // Handle the drag-and-drop operation
  const handleDragEnd = (result: any) => {
    const { destination, source } = result;
  
    // If there's no destination (dropped outside), do nothing
    if (!destination) return;
  
    // If the item is dropped in the same place, do nothing
    if (destination.index === source.index) return;
  
    // Reorder the components array in the dummy state (temporary data)
    const reorderedComponents = Array.from(dummyData); // Copy the array
    const [removed] = reorderedComponents.splice(source.index, 1); // Remove the item
    reorderedComponents.splice(destination.index, 0, removed); // Insert at the new position
  
    // Update the orderindex to reflect the new order of components
    const updatedData = reorderedComponents.map((comp, index) => ({
      ...comp,
      orderindex: index + 1, // Update orderindex based on the new position
    }));
  
    setDummyData(updatedData); // Update the dummy state with the reordered components
  
    // Optional: Log the updated data
    console.log("Updated Data after Reorder:", updatedData);
  };
  
  // Optional: Save the changes to localStorage when done (for example, on a button click or at some point in time)
  const saveChangesToLocalStorage = () => {
    dummyData.map((comp) => {
      console.log("Comp",comp)
      axios
        .put(`${backend_url}/user/updatetable/${userId}`,comp)
        .then((response) => {
          console.log("Successfully updated the table of userid ", comp.user_table_id, "Respondse",response.data)
        })
        .catch((error) => {
          console.error("Error fetching the data:",error)
        })
      compareLocalStorageData(comp)
    })
    console.log("Saved changes to localStorage");
  };

  return (
    <div>
      {/* Button to save changes to localStorage */}
      <button onClick={saveChangesToLocalStorage}>Save Changes</button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="ComponentId" direction="horizontal">
          {
            (provided) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "20px"
                }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {
                  dummyData.map((component, index) => {
                    const componentName = removeSpaces(component.table_name);
                    const ComponentToRender = componentMap[componentName];

                    return (
                    <Draggable
                      draggableId={component.user_table_id ? component.user_table_id.toString() : `fallback-id-${index}`} // Fallback if user_table_id is missing
                      key={component.user_table_id ? component.user_table_id.toString() : `fallback-id-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {ComponentToRender}
                        </div>
                      )}
                    </Draggable>

                    );
                  })
                }
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
    </div>
  );
};

function removeSpaces(str: string | undefined | null): string {
  if (!str) return ''; // If the string is null or undefined, return an empty string
  return str.replace(/\s+/g, ''); // Removes all spaces
}


export default EditDisplayComponents;
