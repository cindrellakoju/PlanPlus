import React, { useEffect, useState, useMemo } from 'react';
import { ThemeContext } from '../../context/Theme.context';

interface MoreThanOneColProps {
  data: Record<string, any>[];
  addcheckbox: boolean;
  displacolname: boolean;
  col_name: string | string[];
  table: boolean;
  bgforhead: boolean;
  checkitemEditing : boolean;
  isEditing : boolean
}

const MoreThanOneCol: React.FC<MoreThanOneColProps> = ({
  data,
  addcheckbox,
  displacolname,
  col_name,
  table,
  bgforhead,
  checkitemEditing ,
  isEditing
}) => {
  const context = React.useContext(ThemeContext);
  
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  const [filteredData, setFilteredData] = useState<Record<string, any>[]>([]);

  // If col_name is a single string, convert it to an array for uniform handling
  const colNamesArray = useMemo(() => (Array.isArray(col_name) ? col_name : [col_name]), [col_name]);

  // Handle checkbox change and store the task id
  const handleCheckChange = (taskId: number) => {
    console.log("Received data:", data);
    console.log("Task is:", taskId);
    
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

  // Filter data based on checked items or edit mode
  useEffect(() => {
    if (checkitemEditing ) {
      // Filter data based on checked items
      const filtered = data.filter((item) =>
        context.checkedItems.has(item.data_id)
      );
      setFilteredData(filtered);
    } else if (isEditing) {
      // If not editing, show all data
      setFilteredData(data);
    } else {
      setFilteredData(data); // Reset filtered data
    }
  }, [context.checkedItems, checkitemEditing , data,isEditing]);

  return (
    <>
      <div className="tables">
        <table>
          {isEditing || checkitemEditing  ? (
            <h1>Edit Mode or Checked Item Editing</h1> // You can replace this with an actual UI for editing
          ) : (
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
          )}
          
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={colNamesArray.length + (addcheckbox ? 1 : 0)}>
                  No data available
                </td>
              </tr>
            ) : (
              filteredData.map((item, idx) => {
                // Parse the column_data for each row
                let parsedColumnData;
                try {
                  parsedColumnData = JSON.parse(item.column_data);
                } catch (e) {
                  parsedColumnData = {}; // Handle invalid JSON gracefully
                }

                return (
                  <tr key={item.data_id + idx}>
                    {addcheckbox && (
                      <td style={{ border: table ? '1px solid black' : 'none' }}>
                        <input
                          type="checkbox"
                          checked={context.checkedItems.has(item.data_id)} // Use data_id as unique identifier
                          onChange={() => handleCheckChange(item.data_id)}
                          aria-checked={context.checkedItems.has(item.data_id)}
                        />
                      </td>
                    )}

                    {colNamesArray.map((colName, idx) => (
                      <td key={idx} style={{ border: table ? '1px solid black' : 'none' }}>
                        {parsedColumnData[colName] || 'N/A'}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

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
