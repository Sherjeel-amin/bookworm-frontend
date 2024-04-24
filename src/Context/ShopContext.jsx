import React, { createContext, useState } from "react";
import useBooks from "../Components/item/useBooks";

export const ShopContext = createContext(null);

const getDefaultCart = (books) => {
    let cart = {}
    for (const book of books) {
        cart[book.id] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const books = useBooks(); // assuming useBooks provides the list of products
    const [cartItems, setCartItems] = useState(getDefaultCart(books));

    // Assuming you have some way to fetch or store all products
    const all_product = books; 

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = books.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
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
