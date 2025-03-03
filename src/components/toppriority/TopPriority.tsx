import React from "react";
import "../../styles/TopPriority.css"
import DisplayField from "./DisplayField";
import ComponentWidthHeight from "../../utils/ComponentWidthHeight";

const TopPriority: React.FC = () => {
    const { max_height, max_width, editHWMode } = ComponentWidthHeight('TopPriority');
    console.log(max_height, max_width, editHWMode);

    return (
        <div
            style={editHWMode ? {} : { maxHeight: max_height, width: max_width }}
            className="prioritycontainer"
        >
            <h1>Top Priority</h1>
            <DisplayField />
        </div>
    );
}

export default TopPriority;
