import React from "react"
import LoginField from "./LoginField"
import "../../styles/LoginPage.css"

const LoginPage:React.FC = () => {
    return(
        <div className="container">
            <div className="loginpage">
            <h1>Login</h1>
            <LoginField/>
            </div>
        </div>
    )
}

export default LoginPage