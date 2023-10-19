import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes instead of Route
import Nav from './pages/Nav/Nav';
import Payment from './pages/payment/Payment';
import Home from './pages/etc/Home';
import Bank from './pages/payment/method/Bank';
import Card from './pages/payment/method/Card';
import Wallet from './pages/payment/method/Wallet';
import PAD from './pages/payment/method/PAD';
import Register from './pages/register/Register';
import Footers from './pages/footer/footers';
import Login from './pages/login/Login';
import FoodManage from './pages/home/FoodManage';
import Food from './pages/food/add/Food';
import RiderRegister from './pages/riderRegister/RiderRegister';
import RiderSuccess from './pages/riderRegister/RiderSuccess';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        
        <Routes> {/* Use Routes instead of Route */}
          <Route path="/" element={<Home />} /> 
          <Route path="/payment" element={<Payment />} /> 
          <Route path="/payment/bank" element={<Bank />} />
          <Route path="/payment/card" element={<Card />} />
          <Route path="/payment/wallet" element={<Wallet />} />
          <Route path="/payment/pad" element={<PAD />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<FoodManage />} />
          <Route path="/food/add" element={<Food />} />
          <Route path="/rider/register" element={<RiderRegister />} />
          <Route path="/rider" element={<RiderSuccess />} />
          
        </Routes>
        <Footers />
        
      </div>
    </BrowserRouter>
  );
}

export default App;
