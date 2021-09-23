import React from 'react';

import Footer from '../include/footer';

import {Button, Col, Container, Form, Row} from "react-bootstrap";

import {
    Link
} from "react-router-dom";

const SignUp = () => {
    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-3 col-md-6">
                    <h1 className="mt-5 text-center blue">INSCRIPTION</h1>
                    <Col className="p-5 m-auto rounded-lg">
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez votre Nom" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Prénom</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez votre Prénom" />
                                </Form.Group>
                            </Row>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez votre Email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Téléphone</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez votre numéro de Téléphone" />
                                </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Mot de passe</Form.Label>
                                    <Form.Control type="password" placeholder="Insérez votre mot de passe" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Confirmation mot de passe</Form.Label>
                                    <Form.Control type="password" placeholder="Retapez votre mot de passe" />
                                </Form.Group>
                            </Row>

                            <Row className="mt-5">
                                <Col md={6} className="text-center">
                                    <Button variant="dark btn-block" type="submit">
                                        <Link className="white" to="/">RETOUR</Link>
                                    </Button>
                                </Col>
                                <Col md={6} className="text-center">
                                    <Button variant="dark btn-block" type="submit" className="white">
                                        INSCRIPTION
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    );
};

export default SignUp;