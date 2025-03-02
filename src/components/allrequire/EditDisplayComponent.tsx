import React, { JSX, useContext } from "react";
import { MyContext } from "../../context/Component.context";
import TopPriority from "../toppriority/TopPriority";
import ToDo from "../todo/ToDo";
import BucketList from "../bucketlist/BucketList";
import Schedule from "../schedule/Schedule";
import Money from "../money/Money";
import ToBuy from "../tobuy/ToBuy";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const componentMap: { [key: string]: JSX.Element } = {
  TopPriority: <TopPriority />,
  ToDo: <ToDo />,
  BucketList: <BucketList />,
  Schedule: <Schedule />,
  Money: <Money />,
  ToBuy: <ToBuy />,
};

const EditDisplayComponents: React.FC = () => {
  const context = useContext(MyContext);

  if (!context) {
    console.log("EditDisplayComponents should be wrapped within MyProvider");
    return null;
  }

  const selectedComponents = context.selectedComponents;

  // Handle the drag-and-drop operation
  const handleDragEnd = (result: any) => {
    const { destination, source } = result;

    // If there's no destination (dropped outside), do nothing
    if (!destination) return;

    // If the item is dropped in the same place, do nothing
    if (destination.index === source.index) return;

    // Reorder the components array
    const reorderedComponents = Array.from(selectedComponents);
    const [removed] = reorderedComponents.splice(source.index, 1);
    reorderedComponents.splice(destination.index, 0, removed);

    // Update the context with the reordered components (you might need to add the setter function)
    context.setSelectedComponents(reorderedComponents);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="componentId" direction="horizontal">
        {(provided) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "20px",
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {selectedComponents?.map((component, index) => {
              const componentName = component.name; // Access the 'name' property
              const ComponentToRender = componentMap[componentName];

              return (
                <Draggable
                  draggableId={component.component_id.toString()}
                  key={component.component_id.toString()}
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
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default EditDisplayComponents;
