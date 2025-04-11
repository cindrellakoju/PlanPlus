import SideBar from "../components/homepage/sidebar";
import UpHeader from "../components/homepage/upheader";
import "../styles/MainPage.css"
import "../styles/EditPage.css"
import Selecttheme from "../test/Selecttheme";
import { useContext } from "react";
import { EditThemeContext } from "../context/EditThemeContext";

const EditPage:React.FC = () => {
    const editcontext = useContext(EditThemeContext)
    if (!editcontext) {
        throw new Error("EditPage must be used within a EditThemeProvider");
    }

    const handlesave = () => {
        editcontext.setSaveMode(true)
    }
    return(
        <div className="container">
            <div className="tabs">
                <SideBar/>
            </div>
            <div className="info">
                <UpHeader/>
                <div className="body-field">
                    <div className="editheader">
                        <div className="names">
                            <a onClick={(e) =>editcontext.setEditHeightWidth(true)}>Height and Width</a>
                            <a>Positions</a>
                            <a>Add Tables</a>
                        </div>
                        <button onClick={(e) => handlesave()}>Save</button>
                    </div>
                    <div className="editbody">
                        <Selecttheme/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPage;