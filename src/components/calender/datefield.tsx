import React from 'react';
import sticker  from "../../../public/sticker1.png"

const Calendar:React.FC = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', "Thur" , 'Fri', 'Sat']
    const dates = ['',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    return (
        <>
            <div className="calenderssss">
            <div className="planner">
                <div className="planner-header">
                    <h1>April 2025</h1>
                    <img src={sticker} alt="dog" className="planner-img" />
                </div>

                <div className="weekdays">
                {
                    days.map((comp) => {
                        return <div key={comp}>{comp}</div>;
                    })
                }
                </div>

                <div className="days">
                    {[...Array(3)].map((_, index) => (
                        <div key={`empty-${index}`}></div>
                    ))}
                    {dates.map((comp) => (
                        <div key={comp} className="day" onClick={() => alert(comp)}><h1>{comp}</h1></div>
                    ))}
                </div>
            </div>
            </div>
        </>
    );
};

export default Calendar;
