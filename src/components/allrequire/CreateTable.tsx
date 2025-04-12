import { useState } from "react";

const CreateTable = () => {
    const [tablename, setTableName] = useState<string>("")
    const [column, setColumn] = useState<number>(0); // Default to 0 or any initial value you prefer
    const [columnValues, setColumnValues] = useState<string[]>([]); // To store values for each column

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Table Name: ${tablename}`); // Get table name from form
        console.log(`Number of Columns: ${column}`);
        console.log("Column Values:", columnValues);
    };

    const handleColumnChange = (index: number, value: string) => {
        const newColumnValues = [...columnValues];
        newColumnValues[index] = value;
        setColumnValues(newColumnValues);
    };

    const handleColumnCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numColumns = Number(e.target.value);
        setColumn(numColumns);
        setColumnValues(new Array(numColumns).fill('')); // Reset column values when number of columns changes
    };

    return (
        <div className="tablefield">
            <h1>Create a Table</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="tablename">Table Name</label>
                    <input
                        type="text"
                        id="tablename"
                        onChange={(e) => setTableName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="columnnumber">Enter number of required columns:</label>
                    <input
                        type="number"
                        id="columnnumber"
                        value={column}
                        onChange={handleColumnCountChange}
                        required
                    />
                </div>
                
                {/* Render input fields dynamically based on the number of columns */}
                {column > 0 && (
                    <div>
                        {Array.from({ length: column }, (_, index) => (
                            <div className="colname">
                                <div key={index}>
                                    <label htmlFor={`column-${index}`}>Column {index + 1} Name:</label>
                                    <input
                                        type="text"
                                        id={`column-${index}`}
                                        value={columnValues[index] || ''}
                                        onChange={(e) => handleColumnChange(index, e.target.value)}
                                    />
                                </div>
                                <div key={`type-${index}`}>
                                    <label htmlFor={`column-type-${index}`}>Column {index + 1} Type:</label>
                                    <select
                                        id={`column-type-${index}`}
                                        // value={columnTypes[index] || ''}
                                        // onChange={(e) => handleColumnTypeChange(index, e.target.value)}
                                        required
                                    >
                                        <option value="">Select type</option>
                                        <option value="string">String</option>
                                        <option value="number">Number</option>
                                        <option value="date">Date</option>
                                    </select>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
                
                <button type="submit">Create Table</button>
            </form>
        </div>
    );
};

export default CreateTable;
