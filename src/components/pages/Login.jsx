import React from 'react';

import Footer from '../include/footer';

import {Button, Col, Container, Form, Row} from "react-bootstrap";

import {
  Link
} from "react-router-dom";

const Login = () => {
    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-3 col-md-6">
                    <h1 className="mt-5 text-center blue">CONNEXION</h1>
                    <Col className="p-5 m-auto rounded-lg">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Insérez votre adresse email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword mt-5">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control type="password" placeholder="Insérez votre mot de passe" />
                            </Form.Group>

                            <Row className="mt-5">
                                <Col md={6} className="text-center">
                                    <Button variant="dark btn-block" type="submit">
                                        <Link className="white" to="/">RETOUR</Link>
                                    </Button>
                                </Col>
                                <Col md={6} className="text-center">
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
            <Footer/>
        </>
    );
};

export default Login;