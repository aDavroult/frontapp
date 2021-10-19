import React from 'react';

import Footer from '../include/footer';

import {Button, Col, Container, Form, Row} from "react-bootstrap";

const Login = () => {
    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-3 col-md-6">
                    <h1 className="mt-5 text-center blue">Ajouter une chambre</h1>
                    <Col className="p-5 m-auto rounded-lg">
                        <Form>
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Label>Photos de la chambre</Form.Label>
                                <Form.Control type="file" multiple />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" className="mb-3">
                                <Form.Label>Numéro de la chambre *</Form.Label>
                                <Form.Control type="number" placeholder="Insérez le numéro de la chambre" />
                                <Form.Text className="text-muted">
                                    Ce champ est obligatoire.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword" className="mb-3">
                                <Form.Label>Type de chambre *</Form.Label>
                                <Form.Select aria-label="Type de chambre">
                                    <option value="1">Simple</option>
                                    <option value="2">Double</option>
                                </Form.Select>
                                <Form.Text className="text-muted">
                                    Ce champ est obligatoire.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" className="mb-3">
                                <Form.Label>Prix de la chambre *</Form.Label>
                                <Form.Control type="number" placeholder="Insérez le prix de la chambre" />
                                <Form.Text className="text-muted">
                                    Ce champ est obligatoire.
                                </Form.Text>
                            </Form.Group>

                            <Row className="mt-5">
                                <Col md={12} className="text-center mb-3">
                                    <Button variant="dark btn-block" type="submit" className="white">
                                        AJOUTER
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;