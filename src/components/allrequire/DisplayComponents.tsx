import React, { JSX } from "react";
import TopPriority from "../toppriority/TopPriority";
import ToDo from "../todo/ToDo";
import BucketList from "../bucketlist/BucketList";
import Schedule from "../schedule/Schedule";
import Money from "../money/Money";
import ToBuy from "../tobuy/ToBuy";
import { useLocalStorageData } from "../../hooks/useLocalStorageData";

const componentMap: { [key: string]: JSX.Element } = {
  TopPriority: <TopPriority />,
  ToDoList: <ToDo />,
  BucketList: <BucketList />,
  Schedule: <Schedule />,
  MoneyTransaction: <Money />,
  ToBuy: <ToBuy />,
};

const DisplayComponents: React.FC = () => {
  const localStoragedata = useLocalStorageData()
  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {localStoragedata.map((component, index) => {
        {console.log("Component:",component)}
        const componentName = removeSpaces(component.table_name);  // Access the 'name' property of each selected component
        const ComponentToRender = componentMap[componentName];

        return ComponentToRender ? (
          <div key={index}>{ComponentToRender}</div>
        ) : null;
      })}
    </div>
  );
};

function removeSpaces(str:string) {
  return str.replace(/\s+/g, ''); // Removes all spaces
}
export default DisplayComponents;
