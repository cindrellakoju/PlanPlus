import "../../styles/ChooseField.css"

export const ChooseField = () => {
    return(
        <div className="chooseoption">
        <label htmlFor="field">Choose Field:  </label>
        <select id="field">
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
            <option value="completed">Mark as Completed</option>
        </select>
    </div>
    )
}