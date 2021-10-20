import React from 'react';

import Footer from '../include/footer';

import {Container, Row, Col, Button} from "react-bootstrap";


const myBookings = () => {
    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-1 col-md-10 p-3">
                    <h1 className="mt-5 mb-5 text-center blue">Mes reservations</h1>
                    <Row>
                        <Col md={3}>
                            Date de début :<br />
                            23/09/2021
                        </Col>
                        <Col md={3}>
                            Date de fin :<br />
                            12/10/2021
                        </Col>
                        <Col md={3}>
                            Nombre de chambre :<br />
                            2
                        </Col>
                        <Col md={3}>
                            <Button className="white" variant="dark btn-block">
                                CONSULTER
                            </Button>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={3}>
                            Date de début :<br />
                            23/09/2021
                        </Col>
                        <Col md={3}>
                            Date de fin :<br />
                            12/10/2021
                        </Col>
                        <Col md={3}>
                            Nombre de chambre :<br />
                            2
                        </Col>
                        <Col md={3}>
                            <Button className="white" variant="dark btn-block">
                                CONSULTER
                            </Button>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={3}>
                            Date de début :<br />
                            23/09/2021
                        </Col>
                        <Col md={3}>
                            Date de fin :<br />
                            12/10/2021
                        </Col>
                        <Col md={3}>
                            Nombre de chambre :<br />
                            2
                        </Col>
                        <Col md={3}>
                            <Button className="white" variant="dark btn-block">
                                CONSULTER
                            </Button>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={3}>
                            Date de début :<br />
                            23/09/2021
                        </Col>
                        <Col md={3}>
                            Date de fin :<br />
                            12/10/2021
                        </Col>
                        <Col md={3}>
                            Nombre de chambre :<br />
                            2
                        </Col>
                        <Col md={3}>
                            <Button className="white" variant="dark btn-block">
                                CONSULTER
                            </Button>
                        </Col>
                    </Row>
                    <hr />

                </Row>
            </Container>
            
        </>
    );
};

export default myBookings;