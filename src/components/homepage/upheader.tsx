import profile from "./profile.jpg"

const UpHeader = () => {
    return(
        <div className="header-field">
            <p>Planplus</p>
            <div className="users">
                <img src={profile} alt="profile"/>
            </div>
        </div>
    )
}

export default UpHeader;