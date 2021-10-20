import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Navbar, Nav, Container } from 'react-bootstrap';

import Login from '../pages/Login';
import Home from '../pages/Home';
import SignUp from "../pages/SignUp";
import Contact from "../pages/Contact";
import MyBookings from "../pages/MyBookings";
import AddBooking from "../pages/AddBooking";



const NavbarHotel =() => {

const [islogin ,setIslogin]= useState(false);
const [isadmin ,setIsadmin]= useState(false);

function  logout(){
  localStorage.clear()
  setIslogin(false)
  setIsadmin(false);
}
        return (
          <Router>
            <Navbar >
              <Container>
                <Navbar.Brand href="#home">appHOTEL</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link><Link to="/">Accueil</Link></Nav.Link>
                  <Nav.Link>
                  {islogin &&(
                    <Link to="/reserver">Réserver</Link>
                  )}
                  </Nav.Link>
                  {isadmin &&(
                  <Nav.Link><Link to="/contact">Contact</Link></Nav.Link>
                  )}
                  {islogin &&(
                  <Nav.Link><Link to="/mes-reservations">Mes réservations</Link></Nav.Link>
                  )}
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">                  
                    <Navbar.Text>
                    
                    {islogin ?(
                      <Link to="/" onClick ={logout}>Déconnexion</Link>
                    ):
                    <div>
                    <Link to="/signup">Inscription</Link>
                    &nbsp;|
                    <Link to="/login">Connexion</Link>
                    </div>
                    } 
                    </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/reserver">
                <AddBooking/>
              </Route>
              <Route path="/contact">
                <Contact/>
              </Route>
              <Route path="/mes-reservations">
                <MyBookings/>
              </Route>
              <Route path="/login">
                <Login islogin={islogin} setIslogin={setIslogin} setIsadmin={setIsadmin}/>
              </Route>
              <Route path="/signup">
                <SignUp/>
              </Route>
            </Switch>
          </Router>
        );
    
}

export default NavbarHotel;