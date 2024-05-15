import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/UserProfile.css'; // Import CSS file for styling

const UserProfile = () => {
  const [addressData, setAddressData] = useState([]);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [editAddressLine1, setEditAddressLine1] = useState('');
  const [editAddressLine2, setEditAddressLine2] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editPincode, setEditPincode] = useState('');
  const [editCountry, setEditCountry] = useState('');

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

  useEffect(() => {
    fetchAddressData();
  }, []);

  const handleAddressSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('userId', localStorage.getItem('userId'));
    formData.append('addressLine1', addressLine1);
    formData.append('addressLine2', addressLine2);
    formData.append('city', city);
    formData.append('pincode', pincode);
    formData.append('country', country);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/address`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        alert(response.data.message);
        setAddressLine1('');
        setAddressLine2('');
        setCity('');
        setPincode('');
        setCountry('');
        fetchAddressData();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request. Please try again later.');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/address`,
        {
          data: { addressId },
          headers: { 'Content-Type': 'application/json' } 
        }
      );
  
      if (response.data.success) {
        alert(response.data.message);
        fetchAddressData();
      } else {
        alert(response.data.message || 'Address deletion failed.'); 
      }
    } catch (error) {
      console.error('Error:', error);
  
      // Provide more specific error messages for better user experience
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      alert(errorMessage);
    }
  };

  const handleEditAddress = (address) => {
    setEditAddressId(address.addressId);
    setEditAddressLine1(address.addressline_1);
    setEditAddressLine2(address.addressline_2);
    setEditCity(address.city);
    setEditPincode(address.pin);
    setEditCountry(address.country);
  };

  const handleCancelEdit = () => {
    setEditAddressId(null);
    setEditAddressLine1('');
    setEditAddressLine2('');
    setEditCity('');
    setEditPincode('');
    setEditCountry('');
  };

  const handleSaveEditAddress = async () => {
    const formData = new FormData();
    formData.append('addressId', editAddressId);
    formData.append('addressLine1', editAddressLine1);
    formData.append('addressLine2', editAddressLine2);
    formData.append('city', editCity);
    formData.append('pincode', editPincode);
    formData.append('country', editCountry);

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/address`, formData, {
        
          headers : { 'Content-Type': 'application/json' } 
        
      });
      
      if (response.data.success) {
        alert(response.data.message);
        fetchAddressData();
        handleCancelEdit(); // Reset edit state after successful save
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request. Please try again later.');
    }
  };

  return (
    <>
      {/* Buttons to toggle between profile and addresses */}
      <br /><br />
      <div className="toggle-buttons">
        <button className={showProfile ? 'active' : ''} onClick={() => setShowProfile(true)}>Profile</button>
        <button className={!showProfile ? 'active' : ''} onClick={() => setShowProfile(false)}>Addresses</button>
      </div>

      <div className="container">
        {showProfile ? (
          <div className="user-details-summary">
            <div className="user-info">
              <br />
              <h2>User Profile</h2>
            </div>
            <form className="user-details">
              <label>Username</label>
              <input type="text" name="username" id="username" value={localStorage.getItem('username')} readOnly/>
              <label>Email</label>
              <input type="input" name="email" id="email" value={localStorage.getItem('email')} readOnly/>
              <br /><br /><br />
            </form>
          </div>
        ) : (
          <div className="address-data" id="addresses">
            <h2>Saved Addresses</h2>
            <br />
            {addressData ? (
              <div className="address-details">
                {addressData.map((address, index) => (
                  <div className='data' key={index}>
                    {editAddressId === address.addressId ? (
                      <div className="form-group">
                        <label htmlFor="editAddressLine1">Address Line 1</label>
                        <input type="text" id="editAddressLine1" name="editAddressLine1" value={editAddressLine1} onChange={(e) => setEditAddressLine1(e.target.value)} required />
                        <label htmlFor="editAddressLine2">Address Line 2</label>
                        <input type="text" id="editAddressLine2" name="editAddressLine2" value={editAddressLine2} onChange={(e) => setEditAddressLine2(e.target.value)} required />
                        <label htmlFor="editCity">City</label>
                        <input type="text" id="editCity" name="editCity" value={editCity} onChange={(e) => setEditCity(e.target.value)} required />
                        <label htmlFor="editPincode">Pincode</label>
                        <input type="text" id="editPincode" name="editPincode" value={editPincode} onChange={(e) => setEditPincode(e.target.value)} required />
                        <label htmlFor="editCountry">Country</label>
                        <input type="text" id="editCountry" name="editCountry" value={editCountry} onChange={(e) => setEditCountry(e.target.value)} required />
                        <button className="user-btn" onClick={handleSaveEditAddress}>Save</button>
                        <button className="user-btn" onClick={handleCancelEdit}>Cancel</button>
                      </div>
                    ) : (
                      <>
                        <p>Address Line 1: {address.addressline_1}</p>
                        <p>Address Line 2: {address.addressline_2}</p>
                        <p>City: {address.city}</p>
                        <p>Pin: {address.pin}</p>
                        <p>Country : {address.country}</p>
                        <br /><br />
                        <button className='del-btn' onClick={() => handleDeleteAddress(address.addressId)}>Delete</button>
                        <button className='edit-btn' onClick={() => handleEditAddress(address)}>Edit</button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No addresses found</p>
            )}
          </div>
        )}

        {!showProfile && (
          <div className="user-profile">
            <div className="user-info">
              <br />
              <h2>Add Address</h2>
            </div>
            <form onSubmit={handleAddressSubmit}>
              <div className="form-group">
                <label htmlFor="addressLine1">Address Line 1</label>
                <input type="text" id="addressLine1" name="addressLine1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="addressLine2">Address Line 2</label>
                <input type="text" id="addressLine2" name="addressLine2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input type="text" id="pincode" name="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input type="text" id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
              </div>
              <button className="user-btn" type="submit">Save</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
