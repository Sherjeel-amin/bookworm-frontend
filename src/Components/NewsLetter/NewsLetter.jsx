import React from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers</h1>
      <p>Subscribe to our YouTube Channel</p>
      <div>
        <a href="https://www.youtube.com/your-channel-link" target="_blank" rel="noopener noreferrer">
          <button>Subscribe</button>
        </a>
      </div>
    </div>
  );
};

export default NewsLetter;
