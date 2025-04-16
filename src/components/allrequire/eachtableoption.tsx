interface EditEachTableProps {
    tablename: string,
    localData: any[] | undefined,
    setLocalData: React.Dispatch<React.SetStateAction<any[]>> | undefined,
}

export const EachTableEditOption: React.FC<EditEachTableProps> = ({
    tablename,
    localData,
    setLocalData,
}) => {

    const getCurrentTable = () => localData?.find(comp => comp.table_name === tablename);

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedThemeId = parseInt(e.target.value);
        if (localData && setLocalData) {
            const updatedData = localData.map((comp) =>
                comp.table_name === tablename
                    ? { ...comp, theme_id: selectedThemeId }
                    : comp
            );
            setLocalData(updatedData);
        }
    };

    const handleSelectChange = (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedVal = e.target.value === "true" ? 1 : 0;
        if (localData && setLocalData) {
            const updatedData = localData.map((comp) =>
                comp.table_name === tablename
                    ? { ...comp, [key]: selectedVal }
                    : comp
            );
            setLocalData(updatedData);
        }
    };

    const currentTable = getCurrentTable();

    return (
        <div className="settings-panel">
            <div className="setting-item">
                <label htmlFor="checkbox">Check Box</label>
                <select
                    id="checkbox"
                    value={currentTable?.checkbox === 1 ? "true" : "false"}
                    onChange={handleSelectChange("checkbox")}
                >
                    <option value="false">false</option>
                    <option value="true">true</option>
                </select>
            </div>

            <div className="setting-item">
                <label htmlFor="tablemargin">Table Margin</label>
                <select
                    id="tablemargin"
                    value={currentTable?.table_margin === 1 ? "true" : "false"}
                    onChange={handleSelectChange("table_margin")}
                >
                    <option value="false">false</option>
                    <option value="true">true</option>
                </select>
            </div>

            <div className="setting-item">
                <label htmlFor="bgforhead">Background for Header</label>
                <select
                    id="bgforhead"
                    value={currentTable?.bg_for_header === 1 ? "true" : "false"}
                    onChange={handleSelectChange("bg_for_header")}
                >
                    <option value="false">false</option>
                    <option value="true">true</option>
                </select>
            </div>

            <div className="setting-item">
                <label htmlFor="displaycolname">Display Column Name</label>
                <select
                    id="displaycolname"
                    value={currentTable?.col_name === 1 ? "true" : "false"}
                    onChange={handleSelectChange("col_name")}
                >
                    <option value="false">false</option>
                    <option value="true">true</option>
                </select>
            </div>

            <div className="setting-item">
                <label htmlFor="theme">Select Theme</label>
                <select
                    id="theme"
                    value={currentTable?.theme_id?.toString() ?? ""}
                    onChange={handleThemeChange}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
        </div>
    );
};
