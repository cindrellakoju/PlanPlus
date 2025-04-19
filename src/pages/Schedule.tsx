import React from "react"
import SideBar from "../components/homepage/sidebar"
import UpHeader from "../components/homepage/upheader"
import ExtractSchedule from "../test/ExtractSchedule"


const Schedule:React.FC = () => {
    return(
        <div className="container">
            <div className="tabs">
                <SideBar/>
            </div>
            <div className="info">
                <UpHeader/>
                <div className="body-field">
                    <ExtractSchedule/>
                </div>
            </div>
        </div>
    )
}

export default Schedule