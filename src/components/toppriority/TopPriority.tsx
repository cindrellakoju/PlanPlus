import React from "react";
import "../../styles/TopPriority.css"
import DisplayField from "./DisplayField";
import ComponentWidthHeight from "../../utils/ComponentWidthHeight";

const TopPriority: React.FC = () => {
    const { max_height, max_width, editHWMode, edit_height, edit_width } = ComponentWidthHeight('TopPriority');
    console.log(max_height, max_width, editHWMode, edit_height, edit_width);
    return (
        <div
            style={editHWMode ? {height: edit_height, width: edit_width} : { height: max_height, width: max_width }}
            className="prioritycontainer"
        >
            <h1>Top Priority</h1>
            <DisplayField />
        </div>
    );
}

export default TopPriority;
