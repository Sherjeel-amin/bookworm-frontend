import React, { useContext } from 'react'
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
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
          <button className='addtocart' onClick={() => { addToCart(product.id); toast.success("Added to Cart") }}> ADD TO CART </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay
