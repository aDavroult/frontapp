import React, { useState } from 'react';

import { Button, Col, Container, Form, Row} from 'react-bootstrap';

import { Link,useHistory} from 'react-router-dom';
import axios from 'axios'; 
import MyBookings from '../booking/MyBookings';
import { getRoles } from '../../outils/helpers'


const Login = ({islogin,setIslogin,isadmin,setIsadmin}) => {
    
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory(); 
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            email:email,
            password:password
        }
        axios.post('api/login',data)
        .then(res => {
            console.log(res)
            localStorage.setItem('token',res.data.token)
            setIslogin(true);
            const isornotadmin = getRoles().includes('ROLE_ADMIN');
            console.log(isornotadmin)
            setIsadmin(isornotadmin);
            if(isornotadmin){
                history.push("/add-room");
            }
            else{
                history.push("/reserver");
            }        
        })
        .catch(err => {
            console.log(err);
            alert(err)
        })
        console.log(email);
        console.log(password);
        <MyBookings/>
    }
    return (
        <div>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-3 col-md-6">
                    <h1 className="mt-5 text-center blue">CONNEXION</h1>
                    <Col className="p-5 m-auto rounded-lg">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Insérez votre adresse email" onChange={e => setEmail(e.target.value)} required/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className="mb-3">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control type="password" placeholder="Insérez votre mot de passe" onChange={e => setPassword(e.target.value)} required/>
                            </Form.Group>

                            <Row className="mt-5">
                                <Col md={6} className="text-center mb-3">
                                    <Button variant="dark btn-block" type="submit">
                                        <Link className="white" to="/">RETOUR</Link>
                                    </Button>
                                </Col>
                                <Col md={6} className="text-center mb-3">
                                    <Button variant="dark btn-block" type="submit" className="white">
                                        CONNEXION
                                    </Button>
                                </Col>
                            </Row>

                            <Row className="mt-4 text-center">
                                <Link to="/signup" className="blue">Pas encore de compte ? Créez-en un ici !</Link>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            
        </div>
    );
};

export default Login;