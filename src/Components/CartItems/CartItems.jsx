import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    const handleIncreaseQuantity = (itemId) => {
        addToCart(itemId);
    };

    const handleDecreaseQuantity = (itemId) => {
        if (cartItems[itemId] > 0) {
            removeFromCart(itemId);
        }
    };

    // Check if cart is empty
    const isCartEmpty = Object.values(cartItems).every(quantity => quantity === 0);

    // Render cart items if not empty
    if (!isCartEmpty) {
        return (
            <div className='cartitems'>
                <div className="cartitem-format-main">
                    <p>Products</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Qty</p>
                    <p>Total</p>
                </div>
                <hr />
                {all_product.map((e) => {
                    if (cartItems[e.id] > 0) {
                        return (
                            <div key={e.id}>
                                <div className="cartitems-format cartitem-format-main">
                                    <img className="carticon-product-icon" src={e.cover_image} alt="" />
                                    <p>{e.title}</p>
                                    <p>₹{e.price}</p>
                                    <div className="quanity-items">
                                        <button className='cart-items-qty-b' onClick={() => handleDecreaseQuantity(e.id)}>-</button>
                                        <span>{cartItems[e.id]}</span>
                                        <button className='cart-items-qty-b' onClick={() => handleIncreaseQuantity(e.id)}>+</button>
                                    </div>
                                    <p>₹{e.price * cartItems[e.id]}</p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                })}
                <div className='cartitems-down'>
                    <div className="cartitem-total">
                        <h1>Cart Totals</h1>
                        <div>
                            <div className="cartitems-total-item">
                                <p>Subtotal</p>
                                <p>₹{totalAmount}</p>
                            </div>
                            <hr />
                            <div className="cartitems-total-item">
                                <h3>Total</h3>
                                <h3>₹{totalAmount}</h3>
                            </div>
                            <Link to='/Summary'><button>Proceed to Checkout</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
    
        return (
            <div className="cartitems">
                <h1 className='empty-cart'>No items in cart</h1>
            </div>
        );
    }
}

export default CartItems;
