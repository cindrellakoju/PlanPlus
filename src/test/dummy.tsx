import React, { useState, useRef, useEffect } from 'react';

interface EditableTableProps {}

interface Cell {
  row: number;
  col: number;
}

const EditableTable: React.FC<EditableTableProps> = () => {
  // State for the currently edited cell
  const [editingCell, setEditingCell] = useState<Cell | null>(null);
  const [cellValue, setCellValue] = useState<string>('');
  
  // Ref to store the input element for focusing and positioning the cursor
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Handle cell click to toggle edit mode
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setEditingCell({ row: rowIndex, col: colIndex });
    setCellValue(''); // Clear value when editing starts
  };

  // Handle the loss of focus to stop editing
  const handleBlur = () => {
    setEditingCell(null);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCellValue(e.target.value);
  };

  // Focus and move cursor to the end of the input when it's rendered
  useEffect(() => {
    if (inputRef.current) {
      // Focus the input and move the cursor to the end of the text
      const input = inputRef.current;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length); // Position cursor at the end
    }
  }, [editingCell]); // Triggered when editingCell changes (when a cell is clicked)

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            onClick={() => handleCellClick(0, 0)}
            style={{
              cursor: editingCell && editingCell.row === 0 && editingCell.col === 0 ? 'text' : 'pointer',
            }}
          >
            {editingCell && editingCell.row === 0 && editingCell.col === 0 ? (
              <input
                ref={inputRef}
                type="text"
                value={cellValue}
                onBlur={handleBlur}
                onChange={handleChange}
                autoFocus
              />
            ) : (
              'John Doe'
            )}
          </td>
          <td
            onClick={() => handleCellClick(0, 1)}
            style={{
              cursor: editingCell && editingCell.row === 0 && editingCell.col === 1 ? 'text' : 'pointer',
            }}
          >
            {editingCell && editingCell.row === 0 && editingCell.col === 1 ? (
              <input
                ref={inputRef}
                type="number"
                value={cellValue}
                onBlur={handleBlur}
                onChange={handleChange}
                autoFocus
              />
            ) : (
              '30'
            )}
          </td>
        </tr>
        {/* You can add more rows here */}
      </tbody>
    </table>
  );
};

export default EditableTable;
