// ThemeThree.tsx
import React, { useState } from 'react';
import './ThemeThree.css';

interface ThemeThreeProps {
  table_name?: string;
  urlname?: string;
}

const ThemeThree: React.FC<ThemeThreeProps> = ({ table_name, urlname }) => {
//   // Log the props for debugging
  console.log('table_name:', table_name);
  console.log('urlname:', urlname);

  const [note, setnote] = useState<string>('dcsd  fsfksf sfsbfs fsf f fffgb cfbgh v vhnfgzd fds fs fsjbsfsd fdfjsf sfs f dsj');
  
  return(
    <div className='note-container'>
        <div className='header'>
            {table_name}
        </div>
        <div className='buttons'>
            <i className='bx bx-dots-horizontal-rounded' onClick={() => alert("Button Clicked")}></i>
        </div>
        <div className='notes-lines'>
            <div className='note-display'><p>{note  || "No note added yet"}</p></div>
        </div>
    </div>
)
//   // State to store the textarea content
//   const [note, setNote] = useState<string>('');

//   // State to toggle between view and edit mode
//   const [isEditing, setIsEditing] = useState<boolean>(false);

//   // Handle textarea change
//   const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setNote(e.target.value);
//   };

//   // Toggle edit mode
//   const toggleEditMode = () => {
//     setIsEditing(!isEditing);
//   };

//   return (
//     <div className="note-container">
//       <div className="note-header">
//         {table_name}
//         <button className="add-button" onClick={toggleEditMode}>
//           +
//         </button>
//       </div>
//       <div className="note-lines">
//         {isEditing ? (
//           <textarea
//             value={note}
//             onChange={handleNoteChange}
//             placeholder="Click to add a note..."
//             className="note-textarea"
//             rows={5} // Match the number of lines in the design
//           />
//         ) : (
//           <div className="note-display">{note || 'No note added yet.'}</div>
//         )}
//       </div>
//     </div>
//   );
};

export default ThemeThree;