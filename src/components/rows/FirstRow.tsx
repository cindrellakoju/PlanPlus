import React, { JSX, useEffect, useState } from 'react';
import TopPriority from '../toppriority/TopPriority';
import ToDo from '../todo/ToDo';
import BucketList from '../bucketlist/BucketList';
import Schedule from '../schedule/Schedule';
import Money from '../money/Money';
import ToBuy from '../tobuy/ToBuy';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface ComponentItem {
  component_id: number; 
  name: string;
  order_index: number;
  position_x: number;
  position_y: number;
}

// string ma component assign gareko
const componentMap: { [key: string]: JSX.Element } = {
  TopPriority: <TopPriority />,
  ToDo: <ToDo />,
  BucketList: <BucketList />,
  Schedule: <Schedule />,
  Money: <Money />,
  ToBuy: <ToBuy />
}

export const FirstRow: React.FC = () => {
  const [components, setComponents] = useState<ComponentItem[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/user/componentsposition')
      .then((response) => {
        console.log('Fetched components:', response.data);
        setComponents(response.data);
      })
      .catch((err) => {
        console.log('Error fetching components', err);
      });
  }, []);

  // Handle Drag End
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return; // If dropped outside, do nothing

    // item move garera jun thau ma thiyo tyai thau ma bhayo bhane return nothing
    if( result.source.droppableId === result.destination.droppableId  && result.source.index === result.destination.index){
      return
    }

    const updatedComponents = Array.from(components);
    const [movedItem] = updatedComponents.splice(result.source.index, 1);
    updatedComponents.splice(result.destination.index, 0, movedItem);

    // Update order_index in state
    const reorderedComponents = updatedComponents.map((comp, index) => ({
      ...comp,
      order_index: index,
    }));

    setComponents(reorderedComponents);

    // Update backend with new order
    reorderedComponents.forEach((component) => {
      axios
      axios.put(`http://localhost:5000/user/componentsposition/edit/${component.component_id}`, {
        order_index: component.order_index,
      })
      
        .then(() => console.log(`Updated component ID ${component.component_id}`))
        .catch((err) => console.error(`Error updating component ID ${component.component_id}:`, err));
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* 1 ta matra draggable components xa so hardcode droppaleis */}
      <Droppable droppableId="componentsRow" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            {components.map((item, index) => (
              // draggble id will always be in string
              <Draggable key={item.component_id.toString()} draggableId={item.component_id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      padding: '10px',
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                      ...provided.draggableProps.style,
                    }}
                  >
                    {/* check the components in componentMap dictionary if found display the component */}
                    {componentMap[item.name]}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
