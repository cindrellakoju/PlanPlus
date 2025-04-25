import React from 'react';
import SideBar from "../components/homepage/sidebar"
import UpHeader from "../components/homepage/upheader"
import "../styles/Calender.css"
import Calendar from '../components/calender/datefield';

export const CalenderPage:React.FC = () => {
    return(
        <div className="container">
        <div className="tabs">
            <SideBar/>
        </div>
        <div className="info">
            <UpHeader/>
            <div className="calender">
                <div className="calender-body-field">
                    <Calendar/>
                </div>
                <div className="calender-info-field">

                </div>
            </div>
        </div>
    </div>
    )
}