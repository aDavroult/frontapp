import React from 'react';

import Footer from '../include/footer';

import {Button, Col, Container, Form, Row, Carousel, Image} from "react-bootstrap";

import {
  Link
} from "react-router-dom";

const Login = () => {
    return (
        <>
            <Container className="mb-5 mt-5">
                <Row>
                    <Col className="col-md-6 form-box">
                        <h1 className="mt-5 mb-2 text-center blue">Réservez !</h1>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Date de début</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez la date de début" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Date de fin</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez la date de fin" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Nombre de chambre</Form.Label>
                                    <Form.Control type="number" placeholder="Insérez la date de début" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Type de chambre</Form.Label>
                                    <Form.Select aria-label="Type de chambre">
                                        <option value="1">Chambre Simple</option>
                                        <option value="2">Chambre double</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <hr/>
                            <h3 className="blue mb-2">Nos options :</h3>
                            <Row>
                                <Col className="col-md-4">
                                <Form.Check
                                    type="checkbox"
                                    id="autoSizingCheck"
                                    className="mb-2"
                                    label="Petit déjeuner"
                                />
                                </Col>
                                <Col className="col-md-4">
                                <Form.Check
                                    type="checkbox"
                                    id="autoSizingCheck"
                                    className="mb-2"
                                    label="Piscine"
                                />
                                </Col>
                                <Col className="col-md-4">
                                <Form.Check
                                    type="checkbox"
                                    id="autoSizingCheck"
                                    className="mb-2"
                                    label="Parking"
                                />
                                </Col>
                                <Col className="col-md-4">
                                <Form.Check
                                    type="checkbox"
                                    id="autoSizingCheck"
                                    className="mb-2"
                                    label="Diner"
                                />
                                </Col>
                                <Col className="col-md-4">
                                <Form.Check
                                    type="checkbox"
                                    id="autoSizingCheck"
                                    className="mb-2"
                                    label="Wi-fi"
                                />
                                </Col>
                                <Col className="col-md-4">
                                <Form.Check
                                    type="checkbox"
                                    id="autoSizingCheck"
                                    className="mb-2"
                                    label="Mini bar"
                                />
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Col className="offset-md-3 col-md-6 text-center mb-3">
                                    <Button variant="dark btn-block" type="submit" className="white">
                                        VALIDER
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col className="offset-md-1 col-md-5 form-box">
                        <Row>
                            <Carousel className="mt-3">
                                <Carousel.Item >
                                <img
                                    className="d-block w-100 hero"
                                    src="default-image.png"
                                    alt="First slide"
                                />
                                </Carousel.Item>
                                <Carousel.Item >
                                <img
                                    className="d-block w-100 hero"
                                    src="default-image.png"
                                    alt="Second slide"
                                />
                                </Carousel.Item>
                                <Carousel.Item >
                                <img
                                    className="d-block w-100 hero"
                                    src="default-image.png"
                                    alt="Third slide"
                                />
                                </Carousel.Item>
                            </Carousel>
                        </Row>
                        <Row className="mt-3 mb-3 text-center">
                            <Col className="col-md-4">
                                <Image src="default-placeholder.png" width="100%"/>
                            </Col>
                            <Col className="col-md-4">
                                <Image src="default-placeholder.png" width="100%"/>
                            </Col>
                            <Col className="col-md-4">
                                <Image src="default-placeholder.png" width="100%"/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    );
};

export default Login;