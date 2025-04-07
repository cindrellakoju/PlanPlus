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
  isEditing : boolean;
  checkeditem : Set<number>;
  setCheckedItems :  React.Dispatch<React.SetStateAction<Set<number>>>;
}

const MoreThanOneCol: React.FC<MoreThanOneColProps> = ({
  data,
  addcheckbox,
  displacolname,
  col_name,
  table,
  bgforhead,
  checkitemEditing ,
  isEditing,
  checkeditem,
  setCheckedItems
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

  // Filter data based on checked items or edit mode
  useEffect(() => {
    if (checkitemEditing ) {
      // Filter data based on checked items
      const filtered = data.filter((item) =>
        checkeditem.has(item.data_id)
      );
      setFilteredData(filtered);
    } else if (isEditing) {
      // If not editing, show all data
      setFilteredData(data);
    } else {
      setFilteredData(data); // Reset filtered data
    }
  }, [checkeditem, checkitemEditing , data,isEditing]);

  const handleInputChange = (e:React.FocusEvent<HTMLTableCellElement>, dataId : number, colName:string) => {
    console.log("Target val:",e.target.innerText)
    console.log("data Id:",dataId)
    console.log("Colname:",colName)
    const newVal = e.target.innerText;

    const updatedData = filteredData.map((item) => {
      if (item.data_id === dataId) {
        return {
          ...item,
          column_data: JSON.stringify({
            ...JSON.parse(item.column_data || '{}'),
            [colName]: newVal,
          }),
        };
      }
      return item;
    });

    setFilteredData(updatedData)
  }

  console.log("Filtered data:",filteredData)
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
                          checked={checkeditem.has(item.data_id)} // Use data_id as unique identifier
                          onChange={() => handleCheckChange(item.data_id)}
                          aria-checked={checkeditem.has(item.data_id)}
                        />
                      </td>
                    )}

                    {colNamesArray.map((colName, idx) => (
                          <td
                          key={idx}
                          style={{ border: table ? '1px solid black' : 'none' }}
                          contentEditable={isEditing}
                          suppressContentEditableWarning
                          onBlur={(e) => handleInputChange(e, item.data_id, colName)} // Use onBlur for saving changes
                        >
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
          {Array.from(checkeditem).map((taskId) => (
            <li key={taskId}>{taskId}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MoreThanOneCol;
