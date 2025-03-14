import axios from "axios";
import React, { useState } from "react";

interface SignUpInfo  {
    first_name : string,
    last_name : string,
    email : string,
    password: string
}

const SignUpField:React.FC = () => {
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    console.log(backend_url)

    const [first_name,setFirstName] = useState<string>("")
    const [last_name,setLastName] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")

    const handlesignup = () => {
        const signupinfo : SignUpInfo = {
            first_name,
            last_name,
            email,
            password
        }

        axios
            .post(`${backend_url}/user/signup`, signupinfo)
            .then((response) => {
                console.log("Signup Info",response.data)
                alert(response.data.message)
                setFirstName("")
                setLastName("")
                setEmail("")
                setPassword("")
            })
            .catch((err) => {
                alert(err)
                console.log("Error:",err)
            })
    }
    return(
        <div className="signupfield">
            <input
                type="text"
                id="first_name"
                placeholder="Enter First Name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                type="text"
                id="last_name"
                placeholder="Enter Last Name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input
                type="text"
                id="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handlesignup}>Sign Up</button>
        </div>
    )
}

export default SignUpField;