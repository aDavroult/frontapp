import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Navbar, Nav, Container, DropdownButton, Dropdown } from 'react-bootstrap';

import Login from '../pages/Login';
import Home from '../pages/Home';
import SignUp from "../pages/SignUp";
import Contact from "../pages/Contact";
import MyBookings from "../pages/MyBookings";
import AddBooking from "../pages/AddBooking";
import AddOption from "../pages/AddOption";
import AddRoom from "../pages/AddRoom";

class NavbarHotel extends Component {
    render() {
        return (
          <Router>
            <Navbar >
              <Container>
                <Navbar.Brand href="#home">appHOTEL</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link><Link to="/">Accueil</Link></Nav.Link>
                  <Nav.Link><Link to="/reserver">Réserver</Link></Nav.Link>
                  <Nav.Link><Link to="/contact">Contact</Link></Nav.Link>
                  <Nav.Link><Link to="/mes-reservations">Mes réservations</Link></Nav.Link>
                  <DropdownButton
                    variant="outline-secondary"
                    title="Administration"
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item><Nav.Link><Link to="/add-room">Ajouter une chambre</Link></Nav.Link></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item><Nav.Link><Link to="/add-option">Ajouter une option</Link></Nav.Link></Dropdown.Item>
                  </DropdownButton>
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                       <Link to="/login">Connexion</Link>
                    </Navbar.Text>
                    <Navbar.Text>
                      &nbsp;|&nbsp;
                    </Navbar.Text>
                    <Navbar.Text>
                        <Link to="/signup">Inscription</Link>
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
              <Route path="/add-room">
                <AddRoom/>
              </Route>
              <Route path="/add-option">
                <AddOption/>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/signup">
                <SignUp/>
              </Route>
            </Switch>
          </Router>
        );
    }
}

export default NavbarHotel;