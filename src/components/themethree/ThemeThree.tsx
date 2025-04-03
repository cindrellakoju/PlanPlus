// ThemeThree.tsx
import React, { useEffect, useRef, useState } from 'react';
import './ThemeThree.css';

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
  const col_name: string | string[] = ["task"];
  const [displacolname, setDisplayColname] = useState<boolean>(false);
  const [addcheckbox, setAddCheckBox] = useState<boolean>(true);
  const [table, setTable] = useState<boolean>(false);
  const flex_value = [3,2,1,3,1]

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

      {col_name.length === 1 && (
        <div className="notes-lines">
          {isEditing ? (
            <textarea
              ref={textareaRef}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="note-textarea"
            />
          ) : (
            <div className="note-display">
              <input type='checkbox' className='checkboxtype'/>
              <p>{note || "No note added yet"}</p>
            </div>
          )}
        </div>
      )}

      <div className="colname">
      {displacolname ? (
  col_name.map((name, index) => {
    return (
      <div key={index} className={`colname-item ${name} left-align`} style={{ flex: `${flex_value[index]}` }}>
        {name.charAt(0).toUpperCase() + name.slice(1)} 
      </div>
    );
  })
) : null}


      </div>

      {col_name.length >= 2 && (
        <div className="task-container">
{data.map((item, index) => (
  <div className="task-item" key={index}>
    {addcheckbox ? (
      col_name.includes('status') && (
        <input type="checkbox" className="task-checklist" />
      )
    ) : null}

    {/* Dynamically display only the values of the item */}
    {Object.keys(item).map((key, idx) => {
      // Type assertion: Tell TypeScript that 'key' is one of the keys of 'TaskItem'
      const typedKey = key as keyof TaskItem;

      return (
        <div className={typedKey} key={key} style={{ flex: `${flex_value[idx]}` }}>
          {item[typedKey]} {/* Access value using the typed key */}
        </div>
      );
    })}

    <hr className="divider" />
  </div>
))}

        </div>
      )}

      <div className="savebutton">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default ThemeThree;