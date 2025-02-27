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
  position_x: number;  // Now maps to width
  position_y: number;  // Now maps to height
}

const componentMap: { [key: string]: JSX.Element } = {
  TopPriority: <TopPriority />,
  ToDo: <ToDo />,
  BucketList: <BucketList />,
  Schedule: <Schedule />,
  Money: <Money />,
  ToBuy: <ToBuy />,
};

export const FirstRow: React.FC = () => {
  const [components, setComponents] = useState<ComponentItem[]>([]);

  // Fetching components data (with width and height as position_x and position_y)
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

    // Item move logic
    if (result.source.droppableId === result.destination.droppableId && result.source.index === result.destination.index) {
      return;
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
        .put(`http://localhost:5000/user/componentsposition/edit/${component.component_id}`, {
          order_index: component.order_index,
        })
        .then(() => console.log(`Updated component ID ${component.component_id}`))
        .catch((err) => console.error(`Error updating component ID ${component.component_id}:`, err));
    });
  };

  // Handle resizing for width and height separately
  const handleResizeWidth = (id: number, newWidth: number) => {
    const updatedComponents = components.map((comp) =>
      comp.component_id === id ? { ...comp, position_x: newWidth } : comp
    );
    setComponents(updatedComponents);

    // Update the backend with new width (position_x)
    axios
      .put(`http://localhost:5000/user/componentsposition/edit/${id}`, {
        position_x: newWidth,
      })
      .then(() => console.log(`Updated width for component ID ${id}`))
      .catch((err) => console.error(`Error updating width for component ID ${id}:`, err));
  };

  const handleResizeHeight = (id: number, newHeight: number) => {
    const updatedComponents = components.map((comp) =>
      comp.component_id === id ? { ...comp, position_y: newHeight } : comp
    );
    setComponents(updatedComponents);

    // Update the backend with new height (position_y)
    axios
      .put(`http://localhost:5000/user/componentsposition/edit/${id}`, {
        position_y: newHeight,
      })
      .then(() => console.log(`Updated height for component ID ${id}`))
      .catch((err) => console.error(`Error updating height for component ID ${id}:`, err));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                      width: item.position_x, // Use position_x as width
                      height: item.position_y, // Use position_y as height
                      position: 'relative',
                    }}
                  >
                    {componentMap[item.name]}

                    {/* Resize Handle for Width */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '5px',
                        right: '5px',
                        cursor: 'ew-resize', // Horizontal resize cursor for width
                        padding: '5px',
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        const initialWidth = item.position_x;
                        const initialX = e.clientX;

                        const onMouseMove = (moveEvent: MouseEvent) => {
                          const newWidth = initialWidth + moveEvent.clientX - initialX;
                          handleResizeWidth(item.component_id, newWidth);
                        };

                        const onMouseUp = () => {
                          window.removeEventListener('mousemove', onMouseMove);
                          window.removeEventListener('mouseup', onMouseUp);
                        };

                        window.addEventListener('mousemove', onMouseMove);
                        window.addEventListener('mouseup', onMouseUp);
                      }}
                    >
                      Resize Width
                    </div>

                    {/* Resize Handle for Height */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '5px',
                        left: '5px',
                        cursor: 'ns-resize', // Vertical resize cursor for height
                        padding: '5px',
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        const initialHeight = item.position_y;
                        const initialY = e.clientY;

                        const onMouseMove = (moveEvent: MouseEvent) => {
                          const newHeight = initialHeight + moveEvent.clientY - initialY;
                          handleResizeHeight(item.component_id, newHeight);
                        };

                        const onMouseUp = () => {
                          window.removeEventListener('mousemove', onMouseMove);
                          window.removeEventListener('mouseup', onMouseUp);
                        };

                        window.addEventListener('mousemove', onMouseMove);
                        window.addEventListener('mouseup', onMouseUp);
                      }}
                    >
                      Resize Height
                    </div>
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
