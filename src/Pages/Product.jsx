import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox.jsx/DescriptionBox';

const Product = () => {
  const { allProduct } = useContext(ShopContext);
  const { productId } = useParams();
  const product = allProduct.find((item) => item.id === Number(productId))
  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <ToastContainer/>
    </div>
  )
}

export default Product
