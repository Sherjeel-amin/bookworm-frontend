import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [books, setBooks] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems'));
        return storedCart || {};
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize isLoggedIn state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/books`);
                const booksData = response.data;
                setBooks(booksData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchData();
    }, []);

    const all_product = books ? books : [];

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 0) {
                updatedCart[itemId]--;
            }
            return updatedCart;
        });
    }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = books.find((product) => product.id === Number(item));
                if (itemInfo && itemInfo.price) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount; 
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0)
            {
                totalItem += cartItems[item];
            }
        }
        return totalItem
    }

    const contextValue = { 
        getTotalCartItems, 
        getTotalCartAmount, 
        all_product, 
        cartItems, 
        addToCart, 
        removeFromCart, 
        isLoggedIn, 
        setIsLoggedIn
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
