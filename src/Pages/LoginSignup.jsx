import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CSS/LoginSignup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginSignup = () => {

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    ConfirmPassword: ''
  });


  const isValidEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };


  const checkPasswordCriteria = (password) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const digit = /\d/.test(password);
    const specialChar = /[!@#$%^&*]/.test(password);

    return length && uppercase && lowercase && digit && specialChar;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validateForm(formData)) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/signup`,
          new URLSearchParams(formData).toString(), // Serialize formData
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded' // Set the content type
            }
          }
        )

        if (response.data.success) {
          toast.success("Account created successfully!", { position: "bottom-right" });
          alert("Account created!");

          window.location.href = '/login';
        }else{
          toast.error("Account already exists!", { position: "top-right" });

        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);
    if (submitted) {
      validateForm(newFormData);
    }
  };

  const validateForm = (formData) => {
    let valid = false;
    const newErrors = {};

    if (formData.username.trim() === "") {
      newErrors.username = "Name is required";
    }
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid Email";
    }
    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (!checkPasswordCriteria(formData.password)) {
      newErrors.password = "Enter Valid Password";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      valid = true;
    }
    return valid;
  };

  return (
    <>
      <form className='loginsignup' onSubmit={handleSubmit}>
        <div className="loginsignup-container">
          <h1>Sign up</h1>
          <div className="loginsignup-fields">
            <input type="text" placeholder='Your Name' name='username' id='username' onChange={handleChange} />
            {errors.username && <div className="error">{errors.username}</div>}

            <input type="text" placeholder='Email Address' name='email' id='email' onChange={handleChange} />
            {errors.email && <div className="error">{errors.email}</div>}

            <input type="password" placeholder='Password' name='password' id='password' onChange={handleChange} />
            {errors.password && <div className="error">{errors.password}</div>}

            <input type="password" placeholder='Confirm Password' name='confirmPassword' id='confirmPassword' onChange={handleChange} />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          </div>
          <button type='submit' name='submit' id='submit'>Continue</button>

          <p className="loginsignup-login">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default LoginSignup;
