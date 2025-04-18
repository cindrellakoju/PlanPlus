import React, { useEffect, useState, useMemo } from 'react';
import { ThemeContext } from '../../context/Theme.context';
import axios from 'axios';
import { useUserInfo } from '../../hooks/useUserInfo';

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
  table_name ?: string,
  creatingtable ?: boolean,
  themeid : number,
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
  setCheckedItems,
  table_name,
  creatingtable,
  themeid
}) => {
  const {userId , backend_url} = useUserInfo()
  const context = React.useContext(ThemeContext);
  const [filteredData, setFilteredData] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    if (col_name && creatingtable) {
      // Assuming col_name is used to filter `datas` somehow — or just a placeholder for demo data?
      // If you meant to filter from datas, do that here.
      const initialData = typeof col_name === 'string' ? [] : col_name.map(name => ({ name }));
      setFilteredData(initialData);
    }
  }, [col_name, creatingtable]);
  
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  const [newData, setNewData] = useState<Record<string, any>[]>([]);

  // If col_name is a single string, convert it to an array for uniform handling
  const colNamesArray = useMemo(() => (Array.isArray(col_name) ? col_name : [col_name]), [col_name]);

  // Handle checkbox change and store the task id
  const handleCheckChange = (taskId: number) => {
    
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


  const handleInputChange = (e:React.FormEvent<HTMLTableCellElement>, dataId : number, colName:string) => {
    const newVal = e.currentTarget.innerText;
    const updatedData = filteredData.map((item) => {
      if(item.data_id === dataId){
        let parsedColumnData;
        
        // Attempt to parse column_data safely
        try {
          parsedColumnData = JSON.parse(item.column_data || '{}');
        } catch (error) {
          // If parsing fails, set it to an empty object
          parsedColumnData = {};
        }

        return {
          ...item,
          column_data: JSON.stringify({
            ...parsedColumnData,
            [colName]: newVal
          }),
        };
      }
      return item;
    });

    setNewData(updatedData)
    // setFilteredData(updatedData)
  }

  const handleDelete = (e:React.MouseEvent<HTMLTableCellElement>,dataId: number) => {
    e.preventDefault()
    const sendData = {
      data_id : dataId
    }
    axios
      .post(`${backend_url}/user/deletedataoftable/2`,sendData)
      .then((response) => {
        console.log("Successfully Deleted",response.data)
      })
      .catch((err) => {
        console.log("Error Deleting Data",err)
      })
  }
  
  const handleSave = () => {
    newData.map((item) => {
      const tosend = {
        tablename: table_name,
        data_id: item.data_id,
        value: item.column_data
      }

      axios
        .put(`${backend_url}/user/updatedata/2`,tosend)
        .then((response) => {
          if(response){
            alert("Successfully edited the data")
          }
        })
        .catch((error) => {
          console.log("Error while updating:",error)
        })
    })
  }
  return (
    <>
      <div className="tables">
        <table style={{
            borderCollapse: themeid ===1 ? 'separate':'collapse',
            borderSpacing: themeid ===1 ?'0 12px' : '0 0',
            width: '100%',
        }}>
            <thead>
              <tr>
                {displacolname  &&  addcheckbox && (
                  <th
                    style={{
                      border: table ? '1px solid black' : 'none',
                      backgroundColor: bgforhead ? '#9ec4a8' : 'transparent',
                    }}
                  >
                  </th>
                )}
                {displacolname && colNamesArray.map((name, index) => (
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

                {isEditing && (
                  <th
                    style={{
                      border: table ? '1px solid black' : 'none',
                      backgroundColor: bgforhead ? '#9ec4a8' : 'transparent',
                    }}
                  >
                    {/* Column for checkbox */}
                  </th>
                )}
              </tr>
            </thead>
          
            <tbody style={{ backgroundColor: themeid===1 && col_name.length ===2 ?"#BCC1F2" : 'transparent' }}>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={colNamesArray.length + (addcheckbox ? 1 : 0)}>
                    No data available
                  </td>
                </tr>
              ) : (
                filteredData.map((item, idx) => {
                  let parsedColumnData;
                  try {
                    parsedColumnData = JSON.parse(item.column_data);
                    // console.log("Parsed ColumnDta:", parsedColumnData);
                  } catch (e) {
                    parsedColumnData = {};
                  }

                  return (
                    <tr key={item.data_id + idx}>
                      {addcheckbox && (
                        <td style={{ border: table ? '1px solid black' : 'none' }}>
                          <input
                            type="checkbox"
                            checked={checkeditem.has(item.data_id)}
                            onChange={() => handleCheckChange(item.data_id)}
                            aria-checked={checkeditem.has(item.data_id)}
                          />
                        </td>
                      )}

                      {colNamesArray.map((colName, colIdx) => {
                        // Determine if this is the first or last column
                        const isFirstColumn = colIdx === 0 && !addcheckbox; // Adjust for checkbox column
                        const isLastColumn = colIdx === colNamesArray.length - 1;

                        return (
                          <td
                            key={colIdx}
                            style={{
                              border: table ? '1px solid black' : 'none',
                              borderTopLeftRadius: isFirstColumn ? '10px' : '0px',
                              borderBottomLeftRadius: isFirstColumn ? '10px' : '0px',
                              borderTopRightRadius: isLastColumn ? '10px' : '0px',
                              borderBottomRightRadius: isLastColumn ? '10px' : '0px',
                            }}
                            contentEditable={isEditing}
                            suppressContentEditableWarning
                            onInput={(e) => handleInputChange(e, item.data_id, colName)}
                          >
                            {parsedColumnData[colName] || "N/A"}
                          </td>
                        );
                      })}

                      {isEditing && (
                        <td
                          style={{ border: table ? '1px solid black' : 'none' }}
                          className="delete"
                          onClick={(e) => handleDelete(e, item.data_id)}
                        >
                          <i className="bx bx-mobile" style={{ fontSize: "20px" }}></i>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
        </table>
      </div>

      {
        (isEditing || checkitemEditing) && (
          <div className="savebutton">
            <button onClick={handleSave}>Save</button>
          </div>
        )
      }
    </>
  );
};

export default MoreThanOneCol;
