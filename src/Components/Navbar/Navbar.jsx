import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
    const { getTotalCartItems } = useContext(ShopContext);
    const location = useLocation();
    console.log(location)

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('cartItems');
        window.location.href = '/';
    };

    const loggedIn = localStorage.getItem('token');

    return (
        <div className='navbar'>
            <Link to="/" className="nav-logo">
                <img src={logo} alt="logo" />
                <p>BookWorm</p>
            </Link>

            <ul className="nav-menu">
                <li className={location.pathname === "/" ? 'active' : ''}>
                    <Link style={{ textDecoration: 'none' }} to='/'>Home</Link>
                </li>
                <li className={location.pathname === "/Fiction" ? 'active' : ''}>
                    <Link style={{ textDecoration: 'none' }} to='/Fiction'>Fiction</Link>
                </li>
                <li className={location.pathname === "/Non-Fiction" ? 'active' : ''}>
                    <Link style={{ textDecoration: 'none' }} to='/Non-Fiction'>Non-Fiction</Link>
                </li>
                <li className={location.pathname === "/Kids" ? 'active' : ''}>
                    <Link style={{ textDecoration: 'none' }} to='/Kids'>Kids</Link>
                </li>
            </ul>

            <div className="nav-login-cart">
                {loggedIn ? (
                    <>
                        <Link to='/cart'><img src={cart_icon} alt="icon" /></Link>
                        <div className="nav-cart-count">{getTotalCartItems()}</div>
                        <div className="dropdown">
                            <span className="profile-text">Profile</span>
                            <div className='profile-dd'>
                                <Link to='/profile'><button>My Profile</button></Link>
                                <Link to='/myorders'><button>My Orders</button></Link>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <Link to='/login'><button>Login/Signup</button></Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
