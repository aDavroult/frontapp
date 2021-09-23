import React, { Component } from "react";

import { Navbar, Nav, Container } from 'react-bootstrap';

class loginForm extends Component {
    render() {
        return (
          <Navbar >
            <Container>
              <Navbar.Brand href="#home">appHOTEL</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="index">Accueil</Nav.Link>
                <Nav.Link href="contacts">Contact</Nav.Link>
              </Nav>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                      <a href="login">Connexion</a>
                  </Navbar.Text>
                  <Navbar.Text>
                    &nbsp;|&nbsp;
                  </Navbar.Text>
                  <Navbar.Text>
                      <a href="signup">Inscription</a>
                  </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        );
    }
}

export default loginForm;