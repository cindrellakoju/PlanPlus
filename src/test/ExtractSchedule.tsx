import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserInfo } from "../hooks/useUserInfo";
import ThemeThree from "../components/themethree/ThemeThree";

interface ScheduleProps {
  [key: string]: string;
}

interface ExtractScheduleProps{
  receiveday ?:string,
  height ?: number,
  width ?: number,
  checkbox ?: boolean,
  tablemargin ?: boolean ,
  backgroundforhead ?: boolean,
  displaycolname ?: boolean ,
  themeid ?:number 
}
const ExtractSchedule:React.FC<ExtractScheduleProps> = ({receiveday, height, width, checkbox,tablemargin, backgroundforhead, displaycolname, themeid}) => {
  const { userId, backend_url } = useUserInfo();
  const [localData, setLocalData] = useState<ScheduleProps[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  // Get the current day and rotate the week starting from today
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date().getDay();
  const updatedays = [...Array(7)].map((_, i) => days[(today + i) % 7]);

  // Fetch data
  useEffect(() => {
    updatedays.forEach((comp) => {
      const tosend = { days: comp };

      axios
        .post(`${backend_url}/user/schedule/2`, tosend)
        .then((response) => {
          console.log("REsponse", response.data.column_data)
          setLocalData(response.data.column_data);

          response.data.column_data.map((comp:any[]) => {
            const keys = Object.keys(comp)
            const filterkeys = keys.filter((comp) => comp !== 'data_id')
            setColumns(filterkeys)
          })

        })
        .catch((err) => {
          console.log("Error:", err);
        });
    });
  }, [backend_url]);

  // Render ThemeThree components for each day
  return (
    <>
      {receiveday && height && width && checkbox && tablemargin && backgroundforhead && displaycolname && themeid? (
        (() => {
          const commonProps = {
            table_name: receiveday,
            height: height,
            width: width,
            checkbox: checkbox,
            tablemargin: tablemargin,
            backgroundforhead: backgroundforhead,
            displaycolname: displaycolname,
            themeid: themeid,
            setLocalData,
            localData,
            colnames: columns,
          };
  
          return <ThemeThree key={receiveday} {...commonProps} />;
        })()
      ) : (
        updatedays.map((day, index) => {
          const commonProps = {
            table_name: day,
            height: 465,
            width: 465,
            checkbox: true,
            tablemargin: false,
            backgroundforhead: false,
            displaycolname: true,
            themeid: 1,
            setLocalData,
            localData,
            colnames: columns,
          };
  
          return <ThemeThree key={day} {...commonProps} />;
        })
      )}
    </>
  );
  
};

export default ExtractSchedule;
