import React, { useState } from 'react';

// MoreThanOneColProps interface for the props
interface MoreThanOneColProps {
  data: Record<string, any>[]; // Generic data structure: array of objects with string keys and any type of values
  addcheckbox: boolean;
  displacolname: boolean;
  col_name: string | string[]; // Column names
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

  const colNamesArray = Array.isArray(col_name) ? col_name : [col_name];

  // Handle checkbox change and store the task id
  const handleCheckChange = (taskId: string) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = new Set(prevCheckedItems);
      console.log("Updated checked",updatedCheckedItems)
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
                ></th>
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
            {data.map((item) => (
              <tr key={item.id}>
                {addcheckbox && (
                  <td style={{ border: table ? '1px solid black' : 'none' }}>
                    <input
                      type="checkbox"
                      checked={checkedItems.has(item.id)} // Check if the current id is in the checked items
                      onChange={() => handleCheckChange(item.id)} // Pass the task id to handleCheckChange
                    />
                  </td>
                )}
                {colNamesArray.map((colName, idx) => (
                  <td key={idx} style={{ border: table ? '1px solid black' : 'none' }}>
                    {item[colName]}
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
