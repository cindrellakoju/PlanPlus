import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for programmatic navigation

interface LoginInfo {
  email: string;
  password: string;
}

const LoginField: React.FC = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(null); // Initialize as null
  const [rememberme, setRememberMe] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  
  // Use navigate from react-router-dom for navigation
  const navigate = useNavigate();

  const handleLogin = () => {
    // Basic form validation before sending request
    if (!email || !password) {
      console.log('Email and Password are required.');
      return;
    }

    const logInfo: LoginInfo = {
      email,
      password,
    };

    setLoginInfo(logInfo); // Optional: keep track of the login data

    axios
      .post(`${backend_url}/user/login`, logInfo)
      .then((response) => {
        console.log('Login successful:', response.data);

        // Store the session token in localStorage or sessionStorage
        if (rememberme) {
          localStorage.setItem('sessionToken', response.data.token); // Store in localStorage if "Remember Me" is checked
        } else {
          sessionStorage.setItem('sessionToken', response.data.token); // Store in sessionStorage otherwise
        }

        // Optionally clear the password after a successful login for security purposes
        setPassword('');
        setLogin(true);

        // Navigate to the root route ("/") after successful login
        navigate('/');  // This will route to "/"
      })
      .catch((err) => {
        console.error('Error login:', err);
      });
  };

  return (
    login ? (
      // You can render a redirect component or whatever you want when logged in
      <div>Logged in successfully!</div> // This will be replaced with actual content after login
    ) : (
      <div className="loginfield">
        <input
          type="text"
          id="user"
          placeholder="Enter your username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <label>
          <input
            type="checkbox"
            checked={rememberme}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember Me
        </label>
      </div>
    )
  );
};

export default LoginField;
