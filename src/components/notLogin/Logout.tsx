import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage or sessionStorage based on where you saved it
    localStorage.removeItem('sessionToken'); // If you used localStorage for remember me
    sessionStorage.removeItem('sessionToken'); // If you used sessionStorage

    // Optionally, clear other session data (like user information)
    // Example: localStorage.removeItem('user');

    // Redirect to the login page after logging out
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
