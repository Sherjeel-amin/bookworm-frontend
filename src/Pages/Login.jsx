import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './CSS/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShopContext } from '../Context/ShopContext';
import { login } from '../services/userService';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { setIsLoggedIn } = useContext(ShopContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            const responseData = response.data

            if (responseData.success) {
                // Store JWT token in localStorage
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('userId', responseData.userId)
                localStorage.setItem('email', responseData.email)
                localStorage.setItem('username', responseData.username)
                setIsLoggedIn(true);
                window.location.href = '/';
                toast.success(responseData.message);
            } else {

                toast.error(responseData.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('An error occurred while logging in. Please try again later.');
        }
    };

    return (
        <div>
            <form className='login' onSubmit={handleSubmit}>
                <div className="login-container">
                    <h1>Log in</h1>
                    <div className="login-fields">
                        <input type="email" placeholder='Email Address' name="email" value={formData.email} onChange={handleChange} />
                        <input type="password" placeholder='Password' name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <button type="submit">Continue</button>

                    <p className="login-login">
                        Don't have an account? <Link to="/signup">Signup here</Link>
                    </p>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
