import React, { useState } from 'react';

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
import RoomList from '../pages/RoomList';
import EditRoom from '../pages/EditRoom';
import ViewRoom from '../pages/ViewRoom';
import DeleteRoom from '../pages/DeleteRoom';
import OptionList from '../pages/OptionList';
import EditOption from '../pages/EditOption';
import ViewOption from '../pages/ViewOption';
import DeleteOption from '../pages/DeleteOption';





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
                  
                  <Nav.Link><Link to="/contact">Contact</Link></Nav.Link>
                  
                  {islogin &&(
                  <Nav.Link><Link to="/mes-reservations">Mes réservations</Link></Nav.Link>
                  )}
                  {isadmin &&(
                  <DropdownButton
                    variant="outline-secondary"
                    title="Administration"
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item><Nav.Link><Link to="/room-list">Liste des chambres</Link></Nav.Link></Dropdown.Item>
                    <Dropdown.Item><Nav.Link><Link to="/option-list">Liste des options</Link></Nav.Link></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item><Nav.Link><Link to="/add-room">Ajouter une chambre</Link></Nav.Link></Dropdown.Item>
                    <Dropdown.Item><Nav.Link><Link to="/add-option">Ajouter une option</Link></Nav.Link></Dropdown.Item>
                  </DropdownButton>
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
                    <Link to="/login"> Connexion</Link>
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
              {islogin &&(
              <Route path="/reserver">
                <AddBooking/>
              </Route>
              )}
              <Route path="/contact">
                <Contact/>
              </Route>
              <Route path="/mes-reservations">
                <MyBookings/>
              </Route>
              {isadmin &&(
              <Route path="/add-room">
                <AddRoom/>
              </Route>
              )}
              {isadmin &&(
              <Route path="/add-option">
                <AddOption/>
              </Route>
              )}
              {isadmin &&(
              <Route path="/room-list">
                <RoomList/>
              </Route>
              )}
              {isadmin &&(
                <Route path="/option-list">
                  <OptionList/>
                </Route>
              )}
              <Route path="/login">
                <Login islogin={islogin} setIslogin={setIslogin} setIsadmin={setIsadmin}/>
              </Route>
              <Route path="/signup">
                <SignUp/>
              </Route>
              <Route path='/room-edit/:id' component={EditRoom} />
              <Route path='/room-view/:id' component={ViewRoom} />
              <Route path='/room-delete/:id' component={DeleteRoom} />
              <Route path='/option-edit/:id' component={EditOption} />
              <Route path='/option-view/:id' component={ViewOption} />
              <Route path='/option-delete/:id' component={DeleteOption} />
            </Switch>
          </Router>
        );
    
}

export default NavbarHotel;