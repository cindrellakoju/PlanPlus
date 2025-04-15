import { useNavigate } from "react-router-dom"

const SideBar = () => {
    const navigate = useNavigate()
    return(
        <>
            <div className="logo">
                <i className='bx bxs-paper-plane'></i>
            </div>
            <div className="options">
                <div className="home" onClick={() => navigate('/')}>
                    <i className='bx bx-home'></i>
                    <p>Home</p>
                </div>
                <div className="schedule">
                    <i className='bx bx-time'></i>
                    <p>Schedule</p>
                </div>
                <div className="calender">
                    <i className='bx bx-calendar' ></i>
                    <p>Calender</p>
                </div>
                <div className="add-tables" onClick={() => navigate('/editpage')}>
                    <i className='bx bx-edit'></i>
                    <p>Edit</p>
                </div>
            </div>
        </>
    )
}

export default SideBar