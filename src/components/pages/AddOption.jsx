import React from 'react';

import {Button, Col, Container, Form, Row} from "react-bootstrap";

const AddOption = () => {
    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-3 col-md-6">
                    <h1 className="mt-5 text-center blue">Ajouter une option</h1>
                    <Col className="p-5 m-auto rounded-lg">
                        <Form>
                            <Form.Group controlId="formBasicEmail" className="mb-3">
                                <Form.Label>Nom de l'option *</Form.Label>
                                <Form.Control type="text" placeholder="Insérez le nom de l'option" required="required"/>
                                <Form.Text className="text-muted">
                                    Ce champ est obligatoire.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className="mb-3">
                                <Form.Label>Prix de l'option *</Form.Label>
                                <Form.Control type="number" placeholder="Insérez le prix de l'option" />
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

export default AddOption;