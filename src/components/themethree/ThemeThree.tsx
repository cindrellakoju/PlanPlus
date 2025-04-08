// ThemeThree.tsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import './ThemeThree.css';
import OneColName from './onecolname';
import MoreThanOneCol from './morethanonecol';
import axios from 'axios';
import { useUserInfo } from '../../hooks/useUserInfo';
import { ThemeContext } from '../../context/Theme.context';

// Props interface
interface ThemeThreeProps {
  table_name?: string;
  urlname?: string;
}

interface ColumnData {
  column_name: string;
}

interface ApiResponse {
  column_data: string; // The data inside 'column_data' is a stringified JSON object
}


const ThemeThree: React.FC<ThemeThreeProps> = ({ table_name, urlname }) => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  const {userId , backend_url} = useUserInfo()
  const [colname, setColName] = useState<string|string[]>()
  const col_name: string | string[] = ["task","priority",'status','description','deadline'];
  const [datas, setData] = useState<Record<string, any>[]>([]);
  const [checkitemEditing , setCheckedItemEditing] = useState<boolean>(false);
  const [isEditing,setIsEditing] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const insertinurl = {
    tablename : urlname
  }

  useEffect(() => {
    axios
      .post(`${backend_url}/user/tablecolumn/2`, insertinurl)
      .then((response) => {
        const columns = response.data.map((item: ColumnData) => item.column_name);
        setColName(columns);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
      
    axios
      .post(`${backend_url}/user/columndata/2`, insertinurl)
      .then((response) => {
        const parsedData = response.data.map((item: ApiResponse) => {
          return JSON.parse(item.column_data) as ColumnData;
        });
        
        console.log("Parsed data",response.data)
        setData(response.data);
      })
      .catch((err) => {
        console.log("Error fetching", err);
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

  // const handleEdit = () => {
  //   if (checkedItems.size > 0 && !checkitemEditing ) {
  //     setCheckedItemEditing(true);
  //   }
  //     setIsEditing(true);
  // };

  const handleEdit = () => {
    if (checkedItems.size > 0 && !checkitemEditing ) {
      setCheckedItemEditing(true);
    }
      setIsEditing(true);
  }
  
  console.log("Send Data:",datas)
  return (
    <div className="note-container">
      <div className="header">{table_name}</div>
      <div className="buttons">
        <i className="bx bx-dots-horizontal-rounded"></i>
        <div className="dropdown">
          <ul>
            {context.addcheckbox ? (
              col_name.includes("status") && (
                <>
                  <li>Completed</li>
                  <li>Delete</li>
                </>
              )
            ) : null}
            <li>Add</li>
            <li onClick={handleEdit}>Edit</li>
          </ul>
        </div>
      </div>
      <div className='body'>
      {
        colname && colname.length === 1 && (
          <OneColName 
            isEditing={isEditing} 
            textareaRef={textareaRef} 
            datas={datas} 
            setData={setData} 
          />
        )
      }

      {
        colname && colname.length >= 2 && (
          <MoreThanOneCol 
            data={datas} 
            addcheckbox={context.addcheckbox} 
            displacolname={context.displaycolname} 
            col_name={colname} 
            table={context.table} 
            bgforhead={context.bgforhead} 
            checkitemEditing = {checkitemEditing }
            isEditing = {isEditing}
            checkeditem = {checkedItems}
            setCheckedItems = {setCheckedItems}
            table_name = {table_name}
          />
        )
      }

      </div>

    </div>
  );
};

export default ThemeThree;