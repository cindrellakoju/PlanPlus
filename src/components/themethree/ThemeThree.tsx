// ThemeThree.tsx
import React, { use, useEffect, useRef, useState } from 'react';
import './ThemeThree.css';

interface ThemeThreeProps {
  table_name?: string;
  urlname?: string;
}

const ThemeThree: React.FC<ThemeThreeProps> = ({ table_name, urlname }) => {
  const col_name:string | string[] = ["task","priority","status"];
  const [displacolname,setDisplayColname] = useState<boolean>(true)
  const [addcheckbox,setAddCheckBox] = useState<boolean>(false)
  const data = [    
    {
      "task": "To complete this dfndf g dm gdg kd gd gkfd  dsfs fskfs fskf sf ksd fs fdks fs fs fskfsjf  g",
      "priority": "high",
      "status" : "iscompleted",
    },
    {
      "task": "To sleep",
      "priority": "low",
      "status" : "iscompleted",
    }
  ];
  
  console.log('urlname:', urlname);
  const [isEditing,setIsEditing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [note, setnote] = useState<string>('dcsd  fsfksf sfsbfs fsf f fffgb cfbgh v vhnfgzd fds fs fsjbsfsd fdfjsf sfs f dsj');

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      // Set the cursor at the end of the text
      const length = textareaRef.current.value.length;

      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]); 

  const handleEdit = () => {
    setIsEditing(true)
  }
  
  const handleSave = () => {
    setIsEditing(false)
  }
  return(
    <div className='note-container'>
        <div className='header'>
            {table_name}
        </div>
        <div className='buttons'>
            <i className='bx bx-dots-horizontal-rounded'></i>
            <div className="dropdown">
                <ul>
                {
                    addcheckbox ? (
                        col_name.includes("status") && (
                        <>
                        <li>Completed</li>
                        <li>Delete</li>
                        </>
                    )
                ) : null
            }
                <li>Add</li>
                <li onClick={handleEdit}>Edit</li>
                </ul>
            </div>
        </div>

        {
            col_name.length === 1 && (
                <div className='notes-lines'>
                {
                    isEditing ? (
                        <textarea
                            ref={textareaRef}
                            value={note}
                            onChange={(e) => setnote(e.target.value)}
                            className='note-textarea'
                        />
                    ) :
                    <div className='note-display'><p>{note  || "No note added yet"}</p></div>
                }
            </div>
            )
        }
        
        <div className='colname'>
            {
                col_name.map((name, index) => {
                    return <div key={index} className={`colname-item ${name}`}>{name}</div>;
                })
            }
        </div>
        {
            col_name.length >= 2 && (
                <div className="task-container">
                {data.map((item, index) => (
                    <div className="task-item" key={index}>
                    { addcheckbox ? ( col_name.includes('status') && (
                        <input type="checkbox" className="task-checklist" />
                    )) : null}
                    
                    <div className="task">{item.task}</div>
                    <div className="priority">{item.priority}</div>
                    <div className="status">{item.status}</div>
                    <hr className="divider" />
                    </div>
                ))}
                </div>
            )
        }

        <div className='savebutton'>
            <button onClick={handleSave}>Save</button>
        </div>
    </div>
    )
};

export default ThemeThree;