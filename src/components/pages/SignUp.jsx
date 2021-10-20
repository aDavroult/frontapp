import React, { useState } from 'react';

import Footer from '../include/footer';

import {Button, Col, Container, Form, Row} from "react-bootstrap";

import {
    Link,useHistory
} from "react-router-dom";
import axios from 'axios'; 



const SignUp = () => {
    const [lastName,setLastName] = useState('');
    const [firstName,setFirstName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const history = useHistory();
    
    
    
    const handleSubmit = e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("les deux mots de passe ne sont pas égaux");
        } else {
        const data = {
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName,
            phone:phone
        }
        axios.post('api/users',data)
        .then(res => {
            console.log(res);
            history.push("/login");
        })
        .catch(err => {
            
            console.log(err)
            
            alert("Email existe déja")
            
        })
        console.log(lastName);
        console.log(firstName);
        console.log(phone);
        console.log(email);
        console.log(password);
        }
        
    }

        return (
        <div>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-3 col-md-6">
                    <h1 className="mt-5 text-center blue">INSCRIPTION</h1>
                    <Col className="p-5 m-auto rounded-lg">
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez votre Nom" onChange={e => setLastName(e.target.value)} required/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Prénom</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez votre Prénom" onChange={e => setFirstName(e.target.value)} required />
                                </Form.Group>
                            </Row>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Insérez votre Email" onChange={e => setEmail(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Téléphone</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez votre numéro de Téléphone" onChange={e => setPhone(e.target.value)} required minlength="10"/>
                                </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Mot de passe</Form.Label>
                                    <Form.Control type="password" placeholder="Insérez votre mot de passe" onChange={e => setPassword(e.target.value)} required minlength="6"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Confirmation mot de passe</Form.Label>
                                    <Form.Control type="password" placeholder="Retapez votre mot de passe" onChange={e => setConfirmPassword(e.target.value)} />
                                </Form.Group>
                            </Row>

                            <Row className="mt-5">
                                <Col md={6} className="text-center">
                                    <Button variant="dark btn-block" type="submit">
                                        <Link className="white" to="/">RETOUR</Link>
                                    </Button>
                                </Col>
                                <Col md={6} className="text-center">
                                    <Button variant="dark btn-block" type="submit" className="white" >
                                        INSCRIPTION
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            
        </div>
    );
};

export default SignUp;