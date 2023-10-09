import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes instead of Route
import Nav from './pages/Nav/Nav';
import Payment from './pages/payment/Payment';
import Home from './pages/etc/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        
        <Routes> {/* Use Routes instead of Route */}
          <Route path="/" element={<Home />} /> 
          <Route path="/payment" element={<Payment />} /> 
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
