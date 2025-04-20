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
    });
  }, [backend_url]);

  // Render ThemeThree components for each day
  return (
    <>
      {updatedays.map((day, index) => {
        const commonProps = {
          table_name: day,
          height: 465,
          width: 465,
          checkbox: false,
          tablemargin: false,
          backgroundforhead: false,
          displaycolname: true,
          themeid: 1,
          setLocalData,
          localData,
          colnames: columns,
        };

        return <ThemeThree key={day} {...commonProps} />;
      })}
    </>
  );
};

export default ExtractSchedule;
