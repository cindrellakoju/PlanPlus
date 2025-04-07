import React from 'react';

interface OneColNameProps {
  isEditing: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  datas: Record<string, any>[]; // Array of objects with dynamic keys
  setData: React.Dispatch<React.SetStateAction<Record<string, any>[]>>; 
}

const OneColName: React.FC<OneColNameProps> = ({ isEditing, textareaRef, datas, setData }) => {

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const updatedDatas = [...datas];
    updatedDatas[index] = {
      ...updatedDatas[index],
      note: e.target.value // Assuming `note` is the key for the note content
    };
    setData(updatedDatas);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedDatas = [...datas];
    updatedDatas[index] = {
      ...updatedDatas[index],
      isChecked: !updatedDatas[index].isChecked // Toggle checked status
    };
    setData(updatedDatas);
  };

  console.log("Received Data",datas)
  return (
    <div className="notes-lines">
      {datas.map((data, index) => {
        const columnData = JSON.parse(data.column_data); // Parse the column_data to access the note and isChecked

        return (
          <div key={data.data_id} className="note-item">
            {isEditing ? (
              <textarea
                ref={textareaRef}
                value={columnData.note || ""}
                onChange={(e) => handleChange(e, index)}
                className="note-textarea"
              />
            ) : (
              <div className="note-display">
                <input
                  type="checkbox"
                  className="checkboxtype"
                  checked={columnData.isChecked || false}
                  onChange={() => handleCheckboxChange(index)}
                />
                <p>{columnData.note || "No note added yet"}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OneColName;
