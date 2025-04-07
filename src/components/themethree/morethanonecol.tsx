import React, { useEffect, useState } from 'react';
import { ThemeContext } from '../../context/Theme.context';

// MoreThanOneColProps interface for the props
interface MoreThanOneColProps {
  data: Record<string, any>[]; // Array of objects
  addcheckbox: boolean;
  displacolname: boolean;
  col_name: string | string[]; // Column names (single or array of strings)
  table: boolean;
  bgforhead: boolean;
}

const MoreThanOneCol: React.FC<MoreThanOneColProps> = ({
  data,
  addcheckbox,
  displacolname,
  col_name,
  table,
  bgforhead,
}) => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  const [filteredData, setFilteredData] = useState<Record<string, any>[]>([]);

  // If col_name is a single string, make it an array for uniform handling
  const colNamesArray = Array.isArray(col_name) ? col_name : [col_name];

  // Handle checkbox change and store the task id
  const handleCheckChange = (taskId: number) => {
    console.log("REceived data:",data)
    console.log("Task is:",taskId)
    context.setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = new Set(prevCheckedItems);
      if (updatedCheckedItems.has(taskId)) {
        updatedCheckedItems.delete(taskId); // Uncheck
      } else {
        updatedCheckedItems.add(taskId); // Check
      }
      return updatedCheckedItems;
    });
  };

  useEffect(() => {
    if (context.checkeditemEditing) {
      // Filter data based on checked items
      const filtered = data.filter((item) =>
        context.checkedItems.has(item.data_id)
      );
      setFilteredData(filtered);
    } else if(context.isEditing) {
      // If not editing, show all data
      setFilteredData(data);
    }
  }, [context.checkedItems, context.checkeditemEditing, data]);
  
  console.log("filtered data",filteredData)
  return (
    <>
      <div className="tables">
        <table>
          <thead>
            <tr>
              {displacolname && (
                <th
                  style={{
                    border: table ? '1px solid black' : 'none',
                    backgroundColor: bgforhead ? '#9ec4a8' : 'transparent',
                  }}
                >
                  {/* Column for checkbox */}
                </th>
              )}
              {colNamesArray.map((name, index) => (
                <th
                  key={index}
                  style={{
                    border: table ? '1px solid black' : 'none',
                    backgroundColor: bgforhead ? '#9ec4a8' : 'transparent',
                  }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
          {data.map((item, idx) => {
              // Parse the column_data for each row
              const parsedColumnData = JSON.parse(item.column_data);

              return (
                <tr key={item.data_id + idx}> {/* Use data_id + index as a unique key */}
                  {addcheckbox && (
                    <td style={{ border: table ? '1px solid black' : 'none' }}>
                      <input
                        type="checkbox"
                        checked={context.checkedItems.has(item.data_id)} // Use data_id as unique identifier for checkbox
                        onChange={() => handleCheckChange(item.data_id)} // Pass data_id as ID to handleCheckChange
                      />
                    </td>
                  )}

                  {colNamesArray.map((colName, idx) => (
                    <td key={idx} style={{ border: table ? '1px solid black' : 'none' }}>
                      {parsedColumnData[colName] || 'N/A'} {/* Display corresponding value or 'N/A' if data is missing */}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Display checked task ids */}
      <div>
        <h4>Checked Task IDs:</h4>
        <ul>
          {Array.from(context.checkedItems).map((taskId) => (
            <li key={taskId}>{taskId}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MoreThanOneCol;
