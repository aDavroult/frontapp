import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

import NavbarHotel from './components/include/navbar.js'
import Footer from "./components/include/footer.js";

import styles from './App.css';

function App() {
  return (
    <>
      <NavbarHotel />
      <Footer />
    </>
  );
}

export default App;