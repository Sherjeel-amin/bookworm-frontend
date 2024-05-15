import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/MyOrders.css'; 

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/order?userId=${userId}`);
        setOrders(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getAddressValues = (addressData) => {
    try {
      const addressObject = JSON.parse(addressData);
      return Object.values(addressObject).join(', '); 
    } catch (error) {
      console.error('Error parsing address data:', error);
      return 'Error parsing address';
    }
  };

  const getCartItemsValues = (cartItemsData) => {
    try {
      const cartItemsObject = JSON.parse(cartItemsData);
      const itemsArray = Object.values(cartItemsObject);
      return itemsArray.map(item => item.title + ' (' + item.quantity + ')').join(', '); // Mapping cart items 
    } catch (error) {
      console.error('Error parsing cart items data:', error);
      return 'Error parsing cart items';
    }
  };

  return (
    <div className="my-orders-container">
      <h2 className="my-orders-title">My Orders</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <ul className="orders-list">
              {orders.map((order, index) => (
                <li key={index} className="order-item">
                  <h1 className="order-id">Order ID: {order.id}</h1>
                  <h3 className="address">Address: {getAddressValues(order.address_data)}</h3>
                  <h3 className="items">Items: {getCartItemsValues(order.cart_items)} </h3>
                  <h2 className="order-total"> Total : {order.total_amount}</h2>
                  <p className='order-date'>Order-Date: {order.order_date}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
