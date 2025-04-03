import React from 'react';

interface OneColNameProps {
  isEditing: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>; // setNote should be a state setter function
}

const OneColName: React.FC<OneColNameProps> = ({ isEditing, textareaRef, note, setNote }) => {
  return (
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
          <input type="checkbox" className="checkboxtype" />
          <p>{note || "No note added yet"}</p>
        </div>
      )}
    </div>
  );
};

export default OneColName;
