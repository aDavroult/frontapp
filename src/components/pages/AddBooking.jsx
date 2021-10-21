import React, {useState, useEffect} from 'react';

import {Button, Col, Container, Form, Row, Carousel, Image} from "react-bootstrap";

import axios from 'axios';
import { Link } from 'react-router-dom';

const AddBooking = () => {
    const [dateStart, setDateStart] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState(10);
    const [rooms, setRooms] = useState('');
    const [options, setOptions] = useState([]);

    const [optionList, setOptionList] = useState([]);

    const getOptions = () => {
        axios.get('http://127.0.0.1:8000/api/options')
        .then((response) => {
            console.log(response);
            const availableOptions = response.data;
            setOptionList(availableOptions);
        })
    }

    useEffect(() => getOptions(), []);

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            dateStart:dateStart,
            endDate:endDate,
            price:price,
            rooms:rooms,
            options:options
        }
        axios.post('https://apphot.herokuapp.com/api/bookings', data)
        .then(res => {
            console.log(res)
            // history.push("/reserver");
        })
        .catch(err => {
            console.log(err)
        })
    }

    // const availableOptions = axios.get('https://apphot.herokuapp.com/api/options'):

    const addRoom = e => {
        e.preventDefault();
        console.log('new Room');
    }

    return (
        <>
            <Container className="mb-5 mt-5">
                <Row>
                    <Col className="col-md-6 form-box">
                        <h1 className="mt-5 mb-2 text-center blue">Réservez !</h1>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Date de début</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez la date de début" name="dateStart" value={dateStart} onChange={(e) => setDateStart(e.target.value)}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Date de fin</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez la date de fin" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Nombre de chambre</Form.Label>
                                    <Form.Control type="number" placeholder="Insérez le nombre de chambre" name="" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Type de chambre</Form.Label>
                                    <Form.Select aria-label="Type de chambre">
                                        <option value="simple" onChange={(e) => setRooms(e.target.value)}>Simple</option>
                                        <option value="doudle" onChange={(e) => setRooms(e.target.value)}>Double</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Button onClick={addRoom}>
                               + Ajouter une chambre
                            </Button>

                            <hr/>
                            <h3 className="blue mb-2">Nos options :</h3>

                            
                            <Row>
                                {optionList.map((optionList) => (
                                    <Col className="col-md-4">
                                        <Form.Check
                                            type="checkbox"
                                            id="autoSizingCheck"
                                            className="mb-2"
                                            label={optionList.name}
                                        />
                                    </Col>
                                ))}
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
        </>
    );
};

export default AddBooking;