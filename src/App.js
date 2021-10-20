import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarHotel from './components/include/navbar.js'
import Footer from "./components/include/footer.js";

// eslint-disable-next-line
import styles from './App.css';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavbarHotel/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;