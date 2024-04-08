import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import app from './firebase/app'
import AppTemplate from './components/appTemplate/AppTemplate';
import HomeScreen from './screens/homeScreen/HomeScreen'
import SignIn from './screens/signIn/SignIn';
import Cart from './screens/cart/Cart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<AppTemplate/>} >
          <Route path='' element = {<HomeScreen/>}/>
          <Route path='signIn' element={<SignIn/>}/>
          <Route path='cart' element = {<Cart/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
