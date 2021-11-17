import React, { useState } from 'react';

import { Button, Col, Container, Form, Row} from 'react-bootstrap';

import { Link,useHistory} from 'react-router-dom'

function Contact() {
    return (
        <div>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-3 col-md-6">
                    <h1 className="mt-5 text-center blue">CONTACT</h1>
                    <Col className="p-5 m-auto rounded-lg">
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez votre Nom" required/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Prénom</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez votre Prénom" required />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Insérez votre Email" required/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Téléphone</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez votre Numéro de téléphone" required />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Sujet</Form.Label>
                                    <Form.Control type="email" placeholder="Insérez le sujet de votre message" required/>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control  as="textarea" rows={3}  placeholder="Insérez votre message" required/>
                                </Form.Group>
                            </Row>

                            <Row className="mt-5">
                                <Col md={6} className="text-center mb-3">
                                    <Button variant="dark btn-block" type="submit">
                                        <Link className="white" to="/">RETOUR</Link>
                                    </Button>
                                </Col>
                                <Col md={6} className="text-center mb-3">
                                    <Button variant="dark btn-block" type="submit" className="white">
                                        ENVOYER
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}

export default Contact;