import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

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

    return (
        <div className='cartitems'>
            <div className="cartitem-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Qty</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitem-format-main">
                                <img className="carticon-product-icon" src={e.image} alt="" />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <div className="quanity-items">
                                <button className='cart-items-qty-b' onClick={() => handleDecreaseQuantity(e.id)}>-</button>
                                <span>{cartItems[e.id]}</span>
                                <button className='cart-items-qty-b' onClick={() => handleIncreaseQuantity(e.id)}>+</button>
                                </div>
                                <p>${e.new_price * cartItems[e.id]}</p>
                
                                <img className="cart-remove-icon" src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
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
                            <p>${totalAmount}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${totalAmount}</h3>
                        </div>
                        <button>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
