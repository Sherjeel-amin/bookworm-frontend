import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>New Arrivals</h2>
        <div>
            <div className="hero-hand-icon">
                <p>New</p>
                <img src={hand_icon} alt="icon" />
            </div>
            <p>Book Collections</p>
            <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
            <button>Latest Collection</button>
            <img src={arrow_icon} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Hero
