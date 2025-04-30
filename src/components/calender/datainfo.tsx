import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";

interface DataInfoProps {
  userselecteddate: string;
}

const DataInfo: React.FC<DataInfoProps> = ({ userselecteddate }) => {
  const [columnData, setColumnData] = useState<[string, string[]][]>([]);
  const { userId, backend_url } = useUserInfo();

  useEffect(() => {
    if (userselecteddate) {
      axios
        .get(`${backend_url}/user/completedtask/${userId}`)
        .then((response) => {
          const groupedData: { [table: string]: string[] } = {};

          response.data.forEach((comp: any) => {
            const tableName = comp.table_name;
            try {
              const parsed = JSON.parse(comp.column_data);
              const firstKey = Object.keys(parsed)[0];
              const value = parsed[firstKey];

              if (!groupedData[tableName]) {
                groupedData[tableName] = [];
              }
              groupedData[tableName].push(value);
            } catch (error) {
              console.error("Failed to parse column_data", error);
            }
          });

          // Convert object to array of [tableName, [task1, task2, ...]]
          const finalData: [string, string[]][] = Object.entries(groupedData);
          setColumnData(finalData);
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  }, [userselecteddate, userId, backend_url]);

  return (
    <div className="datafield">
      <div className="dayfield">
        <h1>{userselecteddate}</h1>
      </div>

      {columnData.length > 0 ? (
        columnData.map(([table, tasks], index) => (
          <div key={index} className="eachdatainfo">
            <div className="colname">
              <div className="tag">{table}</div>
            </div>
            <div className="card">
              <ul>
                {tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div>No data available for the selected date.</div>
      )}
    </div>
  );
};

export default DataInfo;
