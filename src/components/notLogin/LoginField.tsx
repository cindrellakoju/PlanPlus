import React, { useState } from 'react';
import axios from 'axios';

interface LoginInfo {
  email: string;
  password: string;
}

const LoginField: React.FC = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(null); // Initialize as null

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
        // Optionally clear the password after a successful login for security purposes
        setPassword('');
      })
      .catch((err) => {
        console.error('Error login:', err);
      });
  };

  return (
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
    </div>
  );
};

export default LoginField;
