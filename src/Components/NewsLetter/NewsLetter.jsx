import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Excusive Offers on your Email</h1>
        <p>Subscribe to our Newsletter and stay updated</p>
        <div>
            <input type="email" placeholder='Your Email'/>
            <button> Subscribe </button>
        </div>
    </div>
  )
}

export default NewsLetter
