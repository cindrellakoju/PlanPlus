// ThemeThree.tsx
import React, { useEffect, useRef, useState } from 'react';
import './ThemeThree.css';
import OneColName from './onecolname';
import MoreThanOneCol from './morethanonecol';
import axios from 'axios';
import { useUserInfo } from '../../hooks/useUserInfo';

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
  const {userId , backend_url} = useUserInfo()
  const [colname, setColName] = useState<string|string[]>()
  const col_name: string | string[] = ["task","priority",'status','description','deadline'];
  const [displacolname, setDisplayColname] = useState<boolean>(true);
  const [addcheckbox, setAddCheckBox] = useState<boolean>(true);
  const [table, setTable] = useState<boolean>(false);
  const [bgforhead,setBgForHead] = useState<boolean>(true);
  const [datas, setData] = useState<Record<string, any>[]>([]);

  const insertinurl = {
    tablename : urlname
  }

  useEffect(() => {
    console.log("Fetching table:",table_name)
    axios
      .get(`${backend_url}/user/tablecolumn/2`)
      .then((response) => {
        const columns = response.data.map((item: ColumnData) => item.column_name);
        setColName(columns);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
      
      console.log("Getting response for",table_name)
    axios
      .post(`${backend_url}/user/columndata/2`, insertinurl)
      .then((response) => {
        console.log("REsponse", response.data);
        const parsedData = response.data.map((item: ApiResponse) => {
          return JSON.parse(item.column_data) as ColumnData;
        });
        
        setData(parsedData);
      })
      .catch((err) => {
        console.log("Error fetching", err);
      });
      console.log("Data fetched for",table_name)
  }, [table_name]);
  
  const data:  Record<string, any>[] = [
    {
      id: 10,
      task: "Complete this task",
      priority: "high",
      status: "iscompleted",
      description: "Task involves finishing the remaining work on the project",
      deadline: "2025-04-05",
    },
    {
      id: 2,
      task: "Go to sleep",
      priority: "low",
      status: "iscompleted",
      description: "Ensure proper rest before tomorrow's meeting",
      deadline: "2025-04-03",
    },
    {
      id: 3,
      task: "Attend a meeting",
      priority: "medium",
      status: "iscompleted",
      description: "Discuss project updates with the team",
      deadline: "2025-04-04",
    },
    {
      id:4,
      task: "Write an email",
      priority: "low",
      status: "iscompleted",
      description: "Send a follow-up email to the client",
      deadline: "2025-04-02",
    },
    {
      id:5,
      task: "Exercise",
      priority: "medium",
      status: "iscompleted",
      description: "Complete a 30-minute workout session",
      deadline: "2025-04-03",
    },
    {
      id : 6,
      task: "Cook dinner",
      priority: "high",
      status: "iscompleted",
      description: "Prepare a healthy meal for the evening",
      deadline: "2025-04-02",
    },
  ];
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [note, setNote] = useState<string>('dcsd  fsfksf sfsbfs fsf f fffgb cfbgh v vhnfgzd fds fs fsjbsfsd fdfjsf sfs f dsj');

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="note-container">
      <div className="header">{table_name}</div>
      <div className="buttons">
        <i className="bx bx-dots-horizontal-rounded"></i>
        <div className="dropdown">
          <ul>
            {addcheckbox ? (
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
            note={note} 
            setNote={setNote} 
          />
        )
      }

      {
        colname && colname.length >= 2 && (
          <MoreThanOneCol 
            data={datas} 
            addcheckbox={addcheckbox} 
            displacolname={displacolname} 
            col_name={colname} 
            table={table} 
            bgforhead={bgforhead} 
          />
        )
      }

      </div>


      <div className="savebutton">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default ThemeThree;