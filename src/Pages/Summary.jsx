import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext'; 
import './CSS/Summary.css'; 
import { Link } from 'react-router-dom';
const Summary = () => {
  const { cartItems, all_product, getTotalCartAmount } = useContext(ShopContext); 
  const [addressData, setAddressData] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAddressData = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/address?userId=${userId}`);
        const responseData = response.data;
        setAddressData(responseData.address);
      } catch (error) {
        console.error('Error fetching address data:', error);
      }
    };
    fetchAddressData();
  }, []);

  const handleAddressSelection = (index) => {
    setSelectedAddressIndex(index);
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);

    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/order`, {
        userId: userId,
        addressData: addressData[selectedAddressIndex],
        cartItems: Object.keys(filteredCartItems).map(itemId => ({
          title: all_product.find(product => product.id === Number(itemId)).title,
          quantity: filteredCartItems[itemId],
          totalPrice: all_product.find(product => product.id === Number(itemId)).price * filteredCartItems[itemId]
        })),
        totalAmount: getTotalCartAmount() 
      });

      console.log(response.data);
      alert("Order placed successfully!!!")
      window.location.href = '/myorders';
      localStorage.removeItem('cartItems');

    } catch (error) {
      console.error('Error placing order:', error);
    }

    setIsLoading(false);
  };

  const filteredCartItems = Object.fromEntries(
    Object.entries(cartItems).filter(([itemId, quantity]) => quantity > 0)
  );

  return (
    <div className="summary-container">
      <h2>Address Summary</h2>
      <br />
      {addressData && addressData.length > 0 ? (
        <div className="address-toggle">
          {addressData.map((address, index) => (
            <label key={index}>
              <input
                type="radio"
                value={index}
                checked={selectedAddressIndex === index}
                onChange={() => handleAddressSelection(index)}
              />
              Address {index + 1}
            </label>
          ))}
        </div>
      ) : (
        <p>No addresses found</p>
      )}

      {addressData && addressData.length > 0 && (
        <div className="address-details-summary">
          <p>Address Line 1: {addressData[selectedAddressIndex].addressline_1}</p>
          <p>Address Line 2: {addressData[selectedAddressIndex].addressline_2}</p>
          <p>City: {addressData[selectedAddressIndex].city}</p>
          <p>Pin: {addressData[selectedAddressIndex].pin}</p>
          <p>Country: {addressData[selectedAddressIndex].country}</p>
          <br /><br />
        </div>
      )}

      <Link to="/profile"><button className='place-order'> + Add address </button></Link>
      <h2>Cart Items</h2>
      {Object.keys(filteredCartItems).length > 0 ? (
        <div>
          {Object.keys(filteredCartItems).map((itemId, index) => {
            const itemInfo = all_product.find((product) => product.id === Number(itemId));
            if (itemInfo) {
              return (
                <div key={index} className="cart-item">
                  <img src={itemInfo.cover_image} alt={itemInfo.title} />
                  <div>
                    <p>Title: {itemInfo.title}</p>
                    <p>Quantity: {filteredCartItems[itemId]}</p>
                    <p>Total Price: {itemInfo.price * filteredCartItems[itemId]}</p>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
          <hr />
          {addressData && addressData.length > 0 && ( // Conditionally render the button
            <div className='order-footer'>
              <p className='total-amount'>Total Amount: {getTotalCartAmount()}</p>
              <button className='place-order' onClick={handlePlaceOrder} disabled={isLoading}>
                {isLoading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No items in cart</p>
      )}
    </div>
  );
};

export default Summary;
