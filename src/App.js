import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import HomeCatergory from './Pages/HomeCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import fiction_banner from './Components/Assets/banner_fiction.png';
import nonfiction_banner from './Components/Assets/nonfiction_banner.png';
import kid_banner from './Components/Assets/banner_kids.png';
import Login from './Pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Summary from './Pages/Summary';
import UserProfile from './Pages/UserProfile';
import MyOrders from './Pages/MyOrders';
import { PrivateRoutes } from './Components/PrivateRoute';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Fiction' element={<HomeCatergory banner={fiction_banner} category="Fiction" />} />
          <Route path='/Non-Fiction' element={<HomeCatergory banner={nonfiction_banner} category="Non-fiction" />} />
          <Route path='/Kids' element={<HomeCatergory banner={kid_banner} category="Kids" />} />
          <Route path='/signup' element={<LoginSignup />} />
          <Route path='/login' element= {<Login />} />
          <Route path='/product' element={<Product />}>

            <Route path=':productId' element={<Product />} />
          </Route>
          <Route element={<PrivateRoutes />}>
          <Route path='/cart' element={<Cart />} />
          <Route path='/Summary' element= {<Summary />} />
          <Route path='/profile' element= {<UserProfile />} />
          <Route path='/myorders' element ={<MyOrders />} />
          </Route>
        </Routes>
        <Footer />
        <ToastContainer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
