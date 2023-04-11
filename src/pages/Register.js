import React, { useState } from 'react';
import './Register.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idImage, setIdImage] = useState(null);

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form inputs
    const newErrors = {};
    if (firstName.trim() === '') {
      newErrors.firstName = 'Please enter your first name';
    }
    if (lastName.trim() === '') {
      newErrors.lastName = 'Please enter your last name';
    }
    if (email.trim() === '') {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (phoneNumber.trim() === '') {
      newErrors.phoneNumber = 'Please enter your phone number';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (gender.trim() === '') {
      newErrors.gender = 'Please select your gender';
    }
    if (username.trim() === '') {
      newErrors.username = 'Please enter your username';
    }
    if (password.trim() === '') {
      newErrors.password = 'Please enter your password';
    }
    if (confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!idImage) {
      newErrors.idImage = 'Please upload your ID image';
    }

    // Update the errors state
    setErrors(newErrors);

    // Submit the form if there are no errors
    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('gender', gender);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      formData.append('idImage', idImage);

      fetch('/api/register', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            alert('User registered successfully');
          } else {
            alert('Error registering user');
          }
        })
        .catch((error) => {
          console.error(error);
          alert('Error registering user');
        });
    }
  };
  return (
    <div>
      <Navbar />
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        {errors.firstName && <span style={{color:"red"}} className="error">{errors.firstName}</span>}
        <input
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </label>
      <label>
        Last Name:
        {errors.lastName && <span style={{color:"red"}} className="error">{errors.lastName}</span>}
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </label>
      <label>
        Email:
        {errors.email && <span style={{color:"red"}} className="error">{errors.email}</span>}
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Phone Number:
        {errors.phoneNumber && <span style={{color:"red"}} className="error">{errors.phoneNumber}</span>}
        <input
          type="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
      </label>
      <label>
        Gender:
        {errors.gender && <span style={{color:"red"}} className="error">{errors.gender}</span>}
        <select
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Username:
        <div id="error-message" class="hidden"></div>
        {errors.username && <span style={{color:"red"}} className="error">{errors.username}</span>}
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        {errors.password && <span style={{color:"red"}} className="error">{errors.password}</span>}
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <label>
        Confirm Password:
        {errors.confirmPassword && <span style={{color:"red"}} className="error">{errors.confirmPassword}</span>}
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </label>
      <label>
        Valid ID:
        {errors.idImage && <span style={{color:"red"}} className="error">{errors.idImage}</span>}
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setIdImage(event.target.files[0])}
        />
      </label>
      <button type="submit">Register</button>
    </form>
    <Footer />
  </div>
  );
}

export default Register