import axios from "axios";
import { useEffect, useState } from "react";
import { useUserInfo } from "../hooks/useUserInfo";
import ThemeThree from "../components/themethree/ThemeThree";

interface ScheduleProps {
  [key: string]: string;
}

const ExtractSchedule = () => {
  const { userId, backend_url } = useUserInfo();
  const [localData, setLocalData] = useState<ScheduleProps[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const date =  new Date()
  const days= ["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const updatedays:string[] = []
  let today:number = date.getDay();
  for(let i=0; i< days.length; i++ ){
    if (today === 7) {
      today = 0;
    }
    updatedays.push(days[today])
    today++
  }

  
  useEffect(() => {
    const tosend = {
      days: "Monday"
    };
    axios
      .post(`${backend_url}/user/schedule/2`, tosend)
      .then((response) => {
        setLocalData(response.data);

        // Extract columns from the first item
        if (response.data.length > 0) {
          const valueKeys = Object.keys(response.data[0]);
          setColumns(valueKeys);
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, [backend_url]);

  const commonProps = {
    table_name: "Monday",
    height: 465,
    width: 465,
    checkbox: false,
    tablemargin: false,
    backgroundforhead: false,
    displaycolname: true,
    themeid: 1,
    setLocalData,
    localData,
    colnames: columns
  };

  console.log("Columnnme:",columns)
  return <ThemeThree {...commonProps} />;
};

export default ExtractSchedule;
