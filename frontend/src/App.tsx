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
        </Routes>
        <Footers />
        
      </div>
    </BrowserRouter>
  );
}

export default App;
