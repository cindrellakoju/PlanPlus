import SideBar from "../components/homepage/sidebar";
import UpHeader from "../components/homepage/upheader";
import "../styles/MainPage.css"
import "../styles/EditPage.css"
import Selecttheme from "../test/Selecttheme";

const EditPage:React.FC = () => {
    return(
        <div className="container">
            <div className="tabs">
                <SideBar/>
            </div>
            <div className="info">
                <UpHeader/>
                <div className="body-field">
                    <div className="editheader">
                        <a>Height and Width</a>
                        <a>Positions</a>
                        <a>Add Tables</a>
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