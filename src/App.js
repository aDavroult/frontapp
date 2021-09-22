import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav,Container, Carousel } from 'react-bootstrap';

import styles from './App.css';

function App() {
  return (
    <Navbar className={styles.navbar}>
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
                |
            </Navbar.Text>
            <Navbar.Text>
                <a href="signup">Inscription</a>
            </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default App;