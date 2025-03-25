import React, { ComponentType, JSX,useEffect,useState } from "react";
import TopPriority from "../toppriority/TopPriority";
import ToDo from "../todo/ToDo";
import BucketList from "../bucketlist/BucketList";
import Schedule from "../schedule/Schedule";
import Money from "../money/Money";
import ToBuy from "../tobuy/ToBuy";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useLocalStorageData } from "../../hooks/useLocalStorageData";
import { compareLocalStorageData } from "../../utils/compareLocalStorageData";

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
  const localStorageData = useLocalStorageData(); // Fetch data from localStorage

  const [dummyData, setDummyData] = useState(localStorageData); // Local state for managing the temporary data
  const [tableNames, setTableNames] = useState<string[]>([]); // Store table names
  const [orderindex, setOrderIndex] = useState<number[]>([]); // Store index values

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
  
    setDummyData(reorderedComponents); // Update the dummy state with the reordered components
  
    // Map the updated table names and their current order
    const updatedTableNames = reorderedComponents.map((component) => component.table_name); 
    const updatedIndexes = reorderedComponents.map((comp) => comp.orderindex);
  
    // Sort the indexes
    const sortedIndexes = updatedIndexes.sort((a, b) => a - b);
    
    console.log("Updated Table Names:", updatedTableNames);
    console.log("Sorted Indexes:", sortedIndexes);
  
    // Correctly map the sorted indexes to each component based on table_name
    const updatedData = reorderedComponents.map((comp) => {
      // Find the index of the current table_name in updatedTableNames
      const tableIndex = updatedTableNames.indexOf(comp.table_name);
  
      // Update the orderindex with the correct sorted index
      if (tableIndex !== -1) {
        // Create a new component with the updated orderindex
        return { ...comp, orderindex: sortedIndexes[tableIndex] };
      }
      return comp; // If no match found, return the component as is
    });
  
    // Set the updated data
    setDummyData(updatedData);
  };
  
  console.log("Dummy data",dummyData)

  console.log("Tablename:",tableNames,"Order Index:",orderindex)
  // Optional: Save the changes to localStorage when done (for example, on a button click or at some point in time)
  const saveChangesToLocalStorage = () => {
    dummyData.map((comp) => {
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
                        draggableId={component.user_table_id.toString()}
                        key={component.user_table_id.toString()}
                        index={index}
                      >
                        {
                          (provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                display: "flex",
                                flexDirection: "column"
                              }}
                            >
                              {ComponentToRender}
                            </div>
                          )
                        }
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

function removeSpaces(str: string) {
  return str.replace(/\s+/g, ''); // Removes all spaces
}

export default EditDisplayComponents;
