import React, { useState } from "react";
import Header from "../components/layoutcomponent/Header";
import HomePageEdit from "./HomePageEdit";
import AdjustHeightWidth from "../components/allrequire/AdjustHeightWidth";
import { FirstRow } from "../components/rows/demo";

const FrontPageEdit: React.FC = () => {
    // State to manage the selected field
    const [selectedField, setSelectedField] = useState<string>("dragdrop");

    // Handle select change
    const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedField(e.target.value);
    };

    return (
        <>
            <Header />
            <label htmlFor="field">Choose Field: </label>
            <select id="field" value={selectedField} onChange={handleFieldChange}>
                <option value="dragdrop">DragDrop</option>
                <option value="heightwidth">Height Width</option>
            </select>

            {/* Conditionally render components based on selected field */}
            {selectedField === "dragdrop" && <HomePageEdit />}
            {selectedField === "heightwidth" && <AdjustHeightWidth />}
        </>
    );
};

export default FrontPageEdit;
