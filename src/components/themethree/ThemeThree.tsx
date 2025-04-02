// ThemeThree.tsx
import React, { use, useEffect, useRef, useState } from 'react';
import './ThemeThree.css';

interface ThemeThreeProps {
  table_name?: string;
  urlname?: string;
}

const ThemeThree: React.FC<ThemeThreeProps> = ({ table_name, urlname }) => {
  const col_name:string | string[] = ["notes"];
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
                <li>Add</li>
                <li onClick={handleEdit}>Edit</li>
                <li>Delete</li>
                </ul>
            </div>
        </div>
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
        <div className='savebutton'>
            <button onClick={handleSave}>Save</button>
        </div>
    </div>
    )
};

export default ThemeThree;