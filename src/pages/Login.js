
import React, { useState } from 'react';
import './Login.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const validateLoginForm = require("./validateLoginForm");
  const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const handleFormSubmit = async (event) => {
  event.preventDefault();


 
  // Validate the form inputs
  const validationErrors = validateLoginForm(username, password);

  if (validationErrors.length > 0) {
    setErrors(validationErrors);
    return;
  }

  // Send the login request to the server
  try {
    const response = await axios.post("/api/login", { username, password });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", username);

    if (response.data.role === 'user') {
      navigate('/user');
    } else if (response.data.role === 'admin') {
      navigate('/admin');
    }
    
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
  } catch (error) {
    console.log(error);
    setErrors(["Failed to log in. Please try again."]);
  }
};

  return (
    <div>
      <Navbar />
    <div className="login-container">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Log in</button>
        <Link className="regbtn" to="/Register">Sign Up?</Link>
        {errors.length > 0 && (
          <ul>
             <ReportProblemIcon style={{color:"red"}} /> 
            {errors.map((error) => (
              <li style={{color:"red"}} key={error}>{error}</li>
            ))}
          </ul>
        )}
      </form>
    </div>
    <Footer />
  </div>
  )
}

export default Login;
