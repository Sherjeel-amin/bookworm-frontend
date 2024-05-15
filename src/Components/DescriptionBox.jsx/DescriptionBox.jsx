import React, { useState } from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  const [showAuthorDescription, setShowAuthorDescription] = useState(false);

  const toggleDescription = () => {
    setShowAuthorDescription(prevState => !prevState);
  };

  return (
    <div className='desbox'>
      <div className="desbox-toggle-buttons">
        <button onClick={toggleDescription}>
          {showAuthorDescription ? "Show Description" : "Show Author Description"}
        </button>
      </div>
      <div className="desbox-navigator"></div>
      <div className="desbox-nav-box">
        {showAuthorDescription ? "Author Description" : "Description"}
      </div>
      <div className="desbox-des">
        <p>
          {showAuthorDescription ? 
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ut quia est distinctio perferendis fugiat atque excepturi repellendus, tempora eum exercitationem facilis doloribus officiis ad commodi ducimus eligendi! Minus explicabo nihil cumque, molestiae veniam facere ea consectetur fugiat inventore architecto aspernatur sint voluptate, excepturi dicta porro voluptatem totam consequuntur. Sunt assumenda recusandae iusto necessitatibus ipsum voluptatibus, aperiam atque alias esse quam nostrum praesentium repellendus, quidem cupiditate porro laudantium adipisci totam ad deserunt ipsa consectetur nam. Aspernatur modi, blanditiis quae numquam quas ipsum? Sunt odio necessitatibus, cupiditate placeat non quasi alias culpa rem maxime quibusdam aut corrupti similique tempora voluptates veniam." :
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
          }
        </p>
      </div>
    </div>
  );
}

export default DescriptionBox;
