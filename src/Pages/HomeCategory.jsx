import React,{useContext} from 'react';
import './CSS/HomeCategory.css';
import { ShopContext } from '../Context/ShopContext.jsx';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import all_product from '../Components/Assets/all_product.js';
import Item from '../Components/item/Item.jsx';

const HomeCatergory = (props) => {
  const {all_product} = useContext(ShopContext); 

  return (
    <div className='shop-category'>
     <img className='shopcategory-banner' src={props.banner} alt="" />
     <div className="shopcategory-indexSort">
      <p>
        <span>Showing 1 - 12</span> out of 36
      </p>
      <br />
      <span className='shopcategory-sort'>
        Sort by <img src={dropdown_icon} alt="" />
      </span>
      <div className="shopcategory-products">
        {all_product.map((item,i)=>{
          if(props.category===item.category){
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          }
          else{
            return null;
          }
        })}
      </div>
      <br /><br /> <br />
     </div>
    </div>
  )
}


export default HomeCatergory;
