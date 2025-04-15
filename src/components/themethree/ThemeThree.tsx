import React, { useContext, useEffect, useRef, useState } from 'react';
import './ThemeThree.css';
import OneColName from './onecolname';
import MoreThanOneCol from './morethanonecol';
import axios from 'axios';
import { useUserInfo } from '../../hooks/useUserInfo';
import { ThemeProps } from '../../types';
import { EditThemeContext } from '../../context/EditThemeContext';

interface ColumnData {
  column_name: string;
}

const ThemeThree: React.FC<ThemeProps> = ({ table_name, urlname, height, width, checkbox, tablemargin, backgroundforhead, displaycolname, setLocalData, localData }) => {
  const { userId, backend_url } = useUserInfo();
  const [colname, setColName] = useState<string | string[]>();
  const col_name: string | string[] = ['task', 'priority', 'status', 'description', 'deadline'];
  const [datas, setData] = useState<Record<string, any>[]>([]);
  const [checkitemEditing, setCheckedItemEditing] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const [isResizingWidth, setIsResizingWidth] = useState<boolean>(false);
  const [isResizingHeight, setIsResizingHeight] = useState<boolean>(false);
  const [upheight, setUpHeight] = useState<number>(0);
  const [distwidth, setDistWdth] = useState<number>(0);
  const [newid, setNewId] = useState<number>(0);

  const [showAddForm, setShowAddForm] = useState<boolean>(false); // New state for showing the add form
  const [formData, setFormData] = useState<Record<string, string>>({});

  const editcontext = useContext(EditThemeContext);
  if (!editcontext) {
    throw new Error('Theme Three must be within EditThemeProvider');
  }

  const insertinurl = {
    tablename: urlname,
  };

  useEffect(() => {
    axios
      .post(`${backend_url}/user/tablecolumn/2`, insertinurl)
      .then((response) => {
        const columns = response.data.map((item: ColumnData) => item.column_name);
        setColName(columns);
      })
      .catch((error) => {
        console.log('Error fetching data', error);
      });

    axios
      .post(`${backend_url}/user/columndata/2`, insertinurl)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log('Error fetching', err);
      });
  }, [table_name]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (checkedItems.size > 0 && !checkitemEditing) {
      setCheckedItemEditing(true);
    }
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (checkedItems.size > 0 && !checkitemEditing) {
      // Convert the Set to an array and map each item into an object
      const toSend = [...checkedItems].map((item) => ({
        data_id: item,
      }));

      toSend.forEach((item) => {
        axios
          .post(`${backend_url}/user/deletedataoftable/2`, item) // Send only one item at a time
          .then((response) => {
            console.log('Successfully Deleted', response.data);
          })
          .catch((err) => {
            console.log('Error Deleting Data', err);
          });
      });
    }
  };

  const handleCompleted = () => {
    if (checkedItems.size > 0 && !checkitemEditing) {
      const filtered = datas.filter((item) => checkedItems.has(item.data_id));

      const updatedData = filtered.map((item) => {
        const columnData = JSON.parse(item.column_data);
        columnData.status = 'completed';
        item.column_data = JSON.stringify(columnData);
        return item;
      });

      updatedData.map((item) => {
        const tosend = {
          tablename: table_name,
          data_id: item.data_id,
          value: item.column_data,
        };
        axios
          .put(`${backend_url}/user/updatedata/2`, tosend)
          .then((response) => {
            if (response) {
              alert('Successfully edited the data');
            }
          })
          .catch((error) => {
            console.log('Error while updating:', error);
          });
      });
    }
  };

  const handleAdd = () => {
    setShowAddForm(true); // Show the add form when the "Add" button is clicked
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      
    console.log('Raw form data:', formData);

    const tosend = {
      tablename: table_name,
      value: formData
    }

    console.log("To send:",tosend)
    axios
    .post(`${backend_url}/user/insertdata/2`, tosend)
      .then((response) => {
        console.log("Response:",response.data)
      })
      .catch((err) => {
        console.log("Error inserting data:",err)
      })

  };
  return (
    <>
      <div className="note-container" style={{ height: `${height}px`, width: `${width}px` }}>
        <div className="header">{table_name}</div>
        <div className="buttons">
          <i className="bx bx-dots-horizontal-rounded"></i>
          <div className="dropdown">
            <ul>
              {checkbox ? (
                col_name.includes('status') && (
                  <>
                    <li onClick={handleCompleted}>Completed</li>
                    <li onClick={handleDelete}>Delete</li>
                  </>
                )
              ) : null}
              <li onClick={handleAdd}>Add</li>
              <li onClick={handleEdit}>Edit</li>
            </ul>
          </div>
        </div>

        {/* Conditional rendering for the Add Form */}
        {
              showAddForm && (
                <div className="add-form-container">
                  <form className="add-form" onSubmit={handleSubmit}>
                    <h3>{table_name}</h3>
          
                    {Array.isArray(colname) &&
                      colname.map((column, index) => (
                        <div key={index} className="field">
                          <label htmlFor={column}>
                            {column.charAt(0).toUpperCase() + column.slice(1)}
                          </label>
                          <input
                            type="text"
                            id={column}
                            name={column}
                            value={formData[column] || ''}
                            onChange={handleInputChange}
                            placeholder={`Enter value for ${column}`}
                          />
                        </div>
                      ))}
          
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </button>
                  </form>
                </div>
              )
        }


        <div className="body">
          {colname && colname.length === 1 && (
            <OneColName
              isEditing={isEditing}
              textareaRef={textareaRef}
              datas={datas}
              setData={setData}
            />
          )}

          {colname && colname.length >= 2 && (
            <MoreThanOneCol
              data={datas}
              addcheckbox={checkbox}
              displacolname={displaycolname}
              col_name={colname}
              table={tablemargin}
              bgforhead={backgroundforhead}
              checkitemEditing={checkitemEditing}
              isEditing={isEditing}
              checkeditem={checkedItems}
              setCheckedItems={setCheckedItems}
              table_name={table_name}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ThemeThree;
