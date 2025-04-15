import { useState } from "react";
import { DummyrenderTheme } from "../../test/Selecttheme";

const CreateTable = () => {
    const [tablename, setTableName] = useState<string>("")
    const [column, setColumn] = useState<number>(0); // Default to 0 or any initial value you prefer
    const [columnValues, setColumnValues] = useState<string[]>([]); // To store values for each column
    const [themeid,setThemeId] = useState<number>(1)
    const [checkbox,setCheckBox] = useState<boolean>(false)
    const [tablemargin, setTableMargin] = useState<boolean>(false)
    const [backgroundforhead,setBackgroundForHead] = useState<boolean>(false)
    const [displacolname,setDisplayColname] = useState<boolean>(false)

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

    console.log("Column Value:",columnValues)
    return (
        <div className={tablename ? "wholefield doubledisplay" : "wholefield"} >
            <div className="tablefield" style={tablename ? { width : "45%" } : { width : "90%"}}>
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
                                    <div key={`unique-${index}`}>
                                        <label htmlFor={`unique-${index}`}>Column {index + 1} IsUnique:</label>
                                        <select
                                            id={`unique-${index}`}
                                            // value={columnTypes[index] || ''}
                                            // onChange={(e) => handleColumnTypeChange(index, e.target.value)}
                                            required
                                        >
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}

                    {column > 0 && (
                    <div className="settings-panel">
                        <div className="setting-item">
                        <label htmlFor="checkbox">Check Box</label>
                        <select id="checkbox" value={checkbox.toString()} onChange={(e) => setCheckBox(e.target.value === "true")}>
                            <option value="false">false</option>
                            <option value="true">true</option>
                        </select>
                        </div>

                        <div className="setting-item">
                        <label htmlFor="tablemargin">Table Margin</label>
                        <select id="tablemargin" value={tablemargin.toString()} onChange={(e) => setTableMargin(e.target.value === "true")}>
                            <option value="false">false</option>
                            <option value="true">true</option>
                        </select>
                        </div>

                        <div className="setting-item">
                        <label htmlFor="bgforhead">Background for Header</label>
                        <select id="bgforhead" value={backgroundforhead.toString()} onChange={(e) => setBackgroundForHead(e.target.value === "true")}>
                            <option value="false">false</option>
                            <option value="true">true</option>
                        </select>
                        </div>

                        <div className="setting-item">
                        <label htmlFor="displaycolname">Display Column Name</label>
                        <select id="displaycolname" value={displacolname.toString()} onChange={(e) => setDisplayColname(e.target.value === "true")}>
                            <option value="false">false</option>
                            <option value="true">true</option>
                        </select>
                        </div>

                        <div className="setting-item">
                        <label htmlFor="theme">Select Theme</label>
                        <select id="theme" value={themeid} onChange={(e) => setThemeId(Number(e.target.value))}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                        </div>
                    </div>
                    )}

                    
                    <button type="submit">Create Table</button>
                </form>
            </div>
            {
                tablename && (
                    <div className="displayfield" style={{ width : "45%"}}>
                        <DummyrenderTheme table_name={tablename}  themeid={themeid} checkbox={checkbox} tablemargin={tablemargin} backgroundforhead={backgroundforhead}
                        displaycolname={displacolname} colnames={columnValues} creatingtable={true}/>
                    </div>
                    
                )
            }
        </div>
    );
};

export default CreateTable;
