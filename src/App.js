import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import app from './firebase/app'
import AppTemplate from './components/appTemplate/AppTemplate';
import HomeScreen from './screens/homeScreen/HomeScreen'
import SignIn from './screens/signIn/SignIn';
import Cart from './screens/cart/Cart';
import SignUp from './screens/signUp/SignUp.js'
import ProductDetails from './screens/productDetails/ProductDetails.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<AppTemplate/>} >
          <Route path='' element = {<HomeScreen/>}/>
          <Route path='signIn' element={<SignIn/>}/>
          <Route path='signUp' element= {<SignUp/>} />
          <Route path='cart' element = {<Cart/>} />
          <Route path='details/:productId' element = {<ProductDetails/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
