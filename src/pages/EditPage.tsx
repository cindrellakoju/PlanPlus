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

    const handlesave = (e:React.MouseEvent<HTMLButtonElement>) => {
        editcontext.setSaveMode(true)
    }

    const handleHeightwidth = (e:React.MouseEvent<HTMLAnchorElement>) => {
        editcontext.setEditHeightWidth(true)
        editcontext.setEditPosition(false)
        editcontext.setAddTable(false)
    }

    const handlePosition = (e:React.MouseEvent<HTMLAnchorElement>) => {
        editcontext.setEditPosition(true)
        editcontext.setEditHeightWidth(false)
        editcontext.setAddTable(false)
    }

    const handleAddTable = (e:React.MouseEvent<HTMLAnchorElement>) => {
        editcontext.setAddTable(true)
        editcontext.setEditHeightWidth(false)
        editcontext.setEditPosition(false)
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
                            <a onClick={(e) =>handleHeightwidth(e)}>Height and Width</a>
                            <a onClick={(e) => handlePosition(e)}>Positions</a>
                            <a onClick={(e) => handleAddTable(e)}>Add Tables</a>
                        </div>
                        <button onClick={(e) => handlesave(e)}>Save</button>
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