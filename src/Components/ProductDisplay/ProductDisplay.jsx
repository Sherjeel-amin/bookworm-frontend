import React, { useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const loggedIn = localStorage.getItem('token');
  
  // Perform a conditional check to ensure that the product object and its category_name property are defined
  const categoryName = product && product.category_name ? product.category_name : '';

  return (
    <div>
      <div className="productdisplay">
        <div className="productdisplay-left">
          <div className="productdisplay-img">
            <img className="productdisplay-main-img" src={product.cover_image} alt="" />
          </div>
        </div>
        <div className="productdisplay-right">
          <h1>{product.title}</h1>
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-new">₹{product.price}</div>
          </div>
          <div className="productdisplay-right-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium eos nobis, officia eveniet vitae accusamus reprehenderit repudiandae atque quidem architecto cupiditate suscipit dolorem minus dolores officiis aliquam ducimus fuga quam.
          </div>
          <p>Category: {categoryName}</p>
          <br /><br />
          {loggedIn ? (
            <button className='addtocart' onClick={() => { addToCart(product.id); toast.success("Added to Cart" , {position:"top-center"})}}> ADD TO CART </button>
          ) : (
            <h2> Please login to add items to cart <Link to="/login">here</Link></h2>
          )}
          {/* Display the category name */}
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay;
