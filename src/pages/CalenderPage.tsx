import React, { useState } from 'react';
import SideBar from "../components/homepage/sidebar"
import UpHeader from "../components/homepage/upheader"
import "../styles/Calender.css"
import Calendar from '../components/calender/datefield';
import DataInfo from '../components/calender/datainfo';

export const CalenderPage:React.FC = () => {
    const [userselectedDate, setUserSelectedDate] = useState<string>('');

    return(
        <div className="container">
        <div className="tabs">
            <SideBar/>
        </div>
        <div className="info">
            <UpHeader/>
            <div className="calender">
                <div className="calender-body-field">
                    <Calendar setUserSelectedDate={setUserSelectedDate}/>
                </div>
                <div className="calender-info-field">
                    <DataInfo userselecteddate={userselectedDate}/>
                </div>
            </div>
        </div>
    </div>
    )
}