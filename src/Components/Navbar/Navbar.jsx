import React, { useState } from 'react'
import './Navbar.css';
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [menu,setMenu] = useState("Home")
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="logo" />
            <p>BookWorm</p>
            </div>
        
        <ul className="nav-menu">
            <li onClick={()=> setMenu("Home")}><Link style={{textDecoration: 'none'}} to='/'>Home</Link>{menu==="Home"?<hr/>:<></>}</li>
            <li onClick={()=> setMenu("Fiction")}><Link style={{textDecoration: 'none'}} to='/Fiction'>Fiction</Link>{menu==="Fiction"?<hr/>:<></>}</li>
            <li onClick={()=> setMenu("Non-Fiction")}><Link style={{textDecoration: 'none'}} to='/Non-Fiction'>Non-Fiction</Link>{menu==="Non-Fiction"?<hr/>:<></>}</li>
            <li onClick={()=> setMenu("Kids")}><Link style={{textDecoration: 'none'}} to='Kids'>Kids</Link>{menu==="Kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link to='/login'><button>Login</button></Link>
            <Link to='/cart'><img src={cart_icon} alt="icon" /></Link>
            <div className="nav-cart-count">0</div>
        </div>
       
      
    </div>
  )
}

export default Navbar
