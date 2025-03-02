import React from "react";

const HomePageEdit:React.FC = () => {
    return(
        <div>
            <div className="choosefield">
                <label htmlFor="field">Choose Field:  </label>
                <select id="field">
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                    <option value="completed">Mark as Completed</option>
                </select>
            </div>
            <h1>This is HomePage</h1>
        </div>
    )
}

export default HomePageEdit;