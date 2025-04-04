import React, { useState } from 'react';

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
  // State to store the checked task ids (instead of indices)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  // If col_name is a single string, make it an array for uniform handling
  const colNamesArray = Array.isArray(col_name) ? col_name : [col_name];

  console.log("Received data", data); // Check the data structure

  // Handle checkbox change and store the task id
  const handleCheckChange = (taskId: string) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = new Set(prevCheckedItems);
      if (updatedCheckedItems.has(taskId)) {
        updatedCheckedItems.delete(taskId); // Uncheck
      } else {
        updatedCheckedItems.add(taskId); // Check
      }
      return updatedCheckedItems;
    });
  };

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
                  {name.charAt(0).toUpperCase() + name.slice(1)} {/* Capitalize first letter */}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, idx) => (
              <tr key={item.task + idx}> {/* Use task + index as a unique key */}
                {addcheckbox && (
                  <td style={{ border: table ? '1px solid black' : 'none' }}>
                    <input
                      type="checkbox"
                      checked={checkedItems.has(item.task)} // Use task as unique identifier for checkbox
                      onChange={() => handleCheckChange(item.task)} // Pass task as ID to handleCheckChange
                    />
                  </td>
                )}
                {colNamesArray.map((colName, idx) => (
                  <td key={idx} style={{ border: table ? '1px solid black' : 'none' }}>
                    {item[colName] || 'N/A'} {/* Display 'N/A' if data is missing */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Display checked task ids */}
      <div>
        <h4>Checked Task IDs:</h4>
        <ul>
          {Array.from(checkedItems).map((taskId) => (
            <li key={taskId}>{taskId}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MoreThanOneCol;
