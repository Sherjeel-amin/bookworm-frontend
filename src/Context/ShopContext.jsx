import React, { createContext, useState, useEffect } from "react";
import { booksData } from "../services/bookService";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [books, setBooks] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems'));
        return storedCart || {};
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await booksData();
                const bookData = response.data;
                setBooks(bookData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchData();
    }, []);

    const allProduct = books ? books : [];

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    }

    const removeFromCart = (itemId, itemTitle) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 0) {
                if (updatedCart[itemId] === 1) {
                    const confirmed = window.confirm(`${itemTitle} will be removed! Are you sure you want to proceed?`);
                    if (confirmed) {
                        updatedCart[itemId]--;
                        return updatedCart;
                    }
                }
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

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem
    }

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        allProduct,
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
