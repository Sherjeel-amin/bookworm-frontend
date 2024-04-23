import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [books, setBooks] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems'));
        return storedCart || {};
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/Books.php`);
                const booksData = response.data;
                setBooks(booksData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchData();
    }, []);

    const getDefaultCart = (books) => {
        let cart = {};
        for (const book of books) {
            cart[book.id] = 0;
        }
        return cart;
    }

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

    const contextValue = { getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
