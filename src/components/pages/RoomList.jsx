import Footer from '../include/footer';

import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function RoomList() {
    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 text-center">
                    <h1 className="white">Liste de nos chambres</h1>
                    <Col md={3} className="mt-5 mb-5">
                        <Card >
                            <Card.Img variant="top" src="https://www.usine-digitale.fr/mediatheque/3/9/8/000493893/hotel-c-o-q-paris.jpg" />
                            <Card.Body>
                                <Card.Title>Chambre n°91</Card.Title>
                                <Card.Text>
                                DESCRIPTION DE LA CHAMBREEEEEEEEEE
                                </Card.Text>
                                <Button className="text-center white" variant="dark">Voir</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="mt-5 mb-5">
                        <Card >
                            <Card.Img variant="top" src="https://www.usine-digitale.fr/mediatheque/3/9/8/000493893/hotel-c-o-q-paris.jpg" />
                            <Card.Body>
                                <Card.Title>Chambre n°99</Card.Title>
                                <Card.Text>
                                DESCRIPTION DE LA CHAMBREEEEEEEEEE
                                </Card.Text>
                                <Button className="text-center white" variant="dark">Voir</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="mt-5 mb-5">
                        <Card >
                            <Card.Img variant="top" src="https://www.usine-digitale.fr/mediatheque/3/9/8/000493893/hotel-c-o-q-paris.jpg" />
                            <Card.Body>
                                <Card.Title>Chambre n°102</Card.Title>
                                <Card.Text>
                                DESCRIPTION DE LA CHAMBREEEEEEEEEE
                                </Card.Text>
                                <Button className="text-center white" variant="dark">Voir</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="mt-5 mb-5">
                        <Card >
                            <Card.Img variant="top" src="https://www.usine-digitale.fr/mediatheque/3/9/8/000493893/hotel-c-o-q-paris.jpg" />
                            <Card.Body>
                                <Card.Title>Chambre n°203</Card.Title>
                                <Card.Text>
                                DESCRIPTION DE LA CHAMBREEEEEEEEEE
                                </Card.Text>
                                <Button className="text-center white" variant="dark">Voir</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="mt-5 mb-5">
                        <Card >
                            <Card.Img variant="top" src="https://www.usine-digitale.fr/mediatheque/3/9/8/000493893/hotel-c-o-q-paris.jpg" />
                            <Card.Body>
                                <Card.Title>Chambre n°234</Card.Title>
                                <Card.Text>
                                DESCRIPTION DE LA CHAMBREEEEEEEEEE
                                </Card.Text>
                                <Button className="text-center white" variant="dark">Voir</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="mt-5 mb-5">
                        <Card >
                            <Card.Img variant="top" src="https://www.usine-digitale.fr/mediatheque/3/9/8/000493893/hotel-c-o-q-paris.jpg" />
                            <Card.Body>
                                <Card.Title>Chambre n°279</Card.Title>
                                <Card.Text>
                                DESCRIPTION DE LA CHAMBREEEEEEEEEE
                                </Card.Text>
                                <Button className="text-center white" variant="dark">Voir</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default RoomList;