// ThemeThree.tsx
import React, { useEffect, useRef, useState } from 'react';
import './ThemeThree.css';
import OneColName from './onecolname';
import Colname from './Colname';
import MoreThanOneCol from './morethanonecol';

// Props interface
interface ThemeThreeProps {
  table_name?: string;
  urlname?: string;
}

// Interface for data items
interface TaskItem {
    task: string;
    priority: string;
    status: string;
    description: string; // Add a description field
    deadline: string;    // Add a deadline field
}

const ThemeThree: React.FC<ThemeThreeProps> = ({ table_name, urlname }) => {
  const col_name: string | string[] = ["task","priority",'status','description','deadline'];
  const [displacolname, setDisplayColname] = useState<boolean>(true);
  const [addcheckbox, setAddCheckBox] = useState<boolean>(true);
  const [table, setTable] = useState<boolean>(false);
  const [bgforhead,setBgForHead] = useState<boolean>(true)
  const flex_value = [5,2,1,3,1]

  // Typed data array
  const data: TaskItem[] = [
    {
      task: "Complete this task",
      priority: "high",
      status: "iscompleted",
      description: "Task involves finishing the remaining work on the project",
      deadline: "2025-04-05",
    },
    {
      task: "Go to sleep",
      priority: "low",
      status: "iscompleted",
      description: "Ensure proper rest before tomorrow's meeting",
      deadline: "2025-04-03",
    },
    {
      task: "Attend a meeting",
      priority: "medium",
      status: "iscompleted",
      description: "Discuss project updates with the team",
      deadline: "2025-04-04",
    },
    {
      task: "Write an email",
      priority: "low",
      status: "iscompleted",
      description: "Send a follow-up email to the client",
      deadline: "2025-04-02",
    },
    {
      task: "Exercise",
      priority: "medium",
      status: "iscompleted",
      description: "Complete a 30-minute workout session",
      deadline: "2025-04-03",
    },
    {
      task: "Cook dinner",
      priority: "high",
      status: "iscompleted",
      description: "Prepare a healthy meal for the evening",
      deadline: "2025-04-02",
    },
  ];
  
  console.log('urlname:', urlname);
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
          col_name.length === 1 && (
            <OneColName 
                isEditing={isEditing} 
                textareaRef={textareaRef} 
                note={note} 
                setNote={setNote} 
            />
          )
        }
        {
          col_name.length >= 2 && (
            <MoreThanOneCol data={data} addcheckbox={addcheckbox} displacolname={displacolname} col_name={col_name} table={table} bgforhead={bgforhead} />
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