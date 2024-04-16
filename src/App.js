
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

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Fiction' element={<HomeCatergory banner={fiction_banner} category="fiction" />}/>
        <Route path='/Non-Fiction' element={<HomeCatergory banner={nonfiction_banner} category="non-fiction"/>}/>
        <Route path='/Kids' element={<HomeCatergory banner={kid_banner} category="kid"/>}/>
        <Route path='/product' element={<Product />}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
