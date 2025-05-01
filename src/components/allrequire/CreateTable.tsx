import { useState } from "react";
import { DummyrenderTheme } from "../../test/Selecttheme";
import axios from "axios";
import { useUserInfo } from "../../hooks/useUserInfo";

const CreateTable = () => {
    const [tablename, setTableName] = useState<string>("");
    const [column, setColumn] = useState<number>(0);
    const [columnValues, setColumnValues] = useState<string[]>([]);
    const [columnTypes, setColumnTypes] = useState<string[]>([]);
    const [isUnique, setIsUnique] = useState<string[]>([]);
    const [options, setOptions] = useState<string[]>([]); // per-column options
    const [themeid, setThemeId] = useState<number>(1);
    const [checkbox, setCheckBox] = useState<boolean>(false);
    const [tablemargin, setTableMargin] = useState<boolean>(false);
    const [backgroundforhead, setBackgroundForHead] = useState<boolean>(false);
    const [displacolname, setDisplayColname] = useState<boolean>(false);
    const { userId, backend_url } = useUserInfo();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const tosend = {
            tablename,
            colname: columnValues,
            coltype: columnTypes,
            isUnique,
            options,
            themeid,
            checkbox,
            tablemargin,
            bgforhead: backgroundforhead,
            displaycolname: displacolname,
        };

        axios
            .post(`${backend_url}/user/usercreatetable/${userId}`, tosend)
            .then((response) => {
                alert(response.data.data.message);
            })
            .catch(() => {
                alert("Something went wrong while creating the table.");
            });
    };

    const handleColumnChange = (index: number, value: string) => {
        const newColumnValues = [...columnValues];
        newColumnValues[index] = value;
        setColumnValues(newColumnValues);
    };

    const handleColumnCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numColumns = Number(e.target.value);
        setColumn(numColumns);
        setColumnValues(new Array(numColumns).fill(""));
        setColumnTypes(new Array(numColumns).fill(""));
        setIsUnique(new Array(numColumns).fill("false"));
        setOptions(new Array(numColumns).fill("")); // reset options
    };

    const handleColumnTypeChange = (index: number, value: string) => {
        const newColumnTypes = [...columnTypes];
        newColumnTypes[index] = value;
        setColumnTypes(newColumnTypes);

        if (value === "select") {
            alert("Separate the options by comma Example: isCompleted,pending");
        }
    };

    const handleIsUnique = (index: number, value: string) => {
        const newIsUnique = [...isUnique];
        newIsUnique[index] = value;
        setIsUnique(newIsUnique);
    };

    const handleOptionsChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    return (
        <div className={tablename ? "wholefield doubledisplay" : "wholefield"}>
            <div className="tablefield" style={tablename ? { width: "45%" } : { width: "90%" }}>
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

                    {column > 0 && (
                        <div>
                            {Array.from({ length: column }, (_, index) => (
                                <div className="colname" key={index}>
                                    <div>
                                        <label htmlFor={`column-${index}`}>Column {index + 1} Name:</label>
                                        <input
                                            type="text"
                                            id={`column-${index}`}
                                            value={columnValues[index] || ""}
                                            onChange={(e) => handleColumnChange(index, e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`column-type-${index}`}>Column {index + 1} Type:</label>
                                        <select
                                            id={`column-type-${index}`}
                                            value={columnTypes[index] || ""}
                                            onChange={(e) => handleColumnTypeChange(index, e.target.value)}
                                            required
                                        >
                                            <option value="">Select type</option>
                                            <option value="string">String</option>
                                            <option value="number-float">Number(Float)</option>
                                            <option value="number-int">Number(Int)</option>
                                            <option value="date">Date</option>
                                            <option value="select">Choose Options</option>
                                        </select>
                                    </div>

                                    {columnTypes[index] === "select" && (
                                        <div>
                                            <label htmlFor={`select-options-${index}`}>Options</label>
                                            <input
                                                type="text"
                                                id={`select-options-${index}`}
                                                value={options[index] || ""}
                                                onChange={(e) => handleOptionsChange(index, e.target.value)}
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor={`unique-${index}`}>Column {index + 1} IsUnique:</label>
                                        <select
                                            id={`unique-${index}`}
                                            value={isUnique[index] || ""}
                                            onChange={(e) => handleIsUnique(index, e.target.value)}
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

            {tablename && (
                <div className="displayfield" style={{ width: "45%" }}>
                    <DummyrenderTheme
                        table_name={tablename}
                        themeid={themeid}
                        checkbox={checkbox}
                        tablemargin={tablemargin}
                        backgroundforhead={backgroundforhead}
                        displaycolname={displacolname}
                        colnames={columnValues}
                        creatingtable={true}
                    />
                </div>
            )}
        </div>
    );
};

export default CreateTable;
