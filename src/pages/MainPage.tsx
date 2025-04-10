import "../styles/MainPage.css"
import profile from "./profile.jpg"

const MainPage:React.FC = () => {
    return(
        <div className="container">
            <div className="tabs">
                <div className="logo">
                    <i className='bx bxs-paper-plane'></i>
                </div>
                <div className="options">
                    <div className="home">
                        <i className='bx bx-home'></i>
                        <p>Home</p>
                    </div>
                    <div className="schedule">
                        <i className='bx bx-time'></i>
                        <p>Schedule</p>
                    </div>
                    <div className="tables">
                        <i className='bx bx-table'></i>
                        <p>Tables</p>
                    </div>
                    <div className="calender">
                        <i className='bx bx-calendar' ></i>
                        <p>Calender</p>
                    </div>
                    <div className="add-tables">
                        <i className='bx bxs-book-add'></i>
                        <p>Add Table</p>
                    </div>
                </div>
            </div>
            <div className="info">
                <div className="header-field">
                    <p>Planplus</p>
                    <div className="users">
                        <img src={profile} alt="profile"/>
                    </div>
                </div>
                <div className="body-field">
                </div>
            </div>
        </div>
    )
}

export default MainPage;