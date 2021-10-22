import React, {useState, useEffect} from 'react';

import {Button, Col, Container, Form, Row, Carousel, Image} from "react-bootstrap";

import axios from 'axios';
import { Link } from 'react-router-dom';

import { getRoles, getPriceOfSelectedRooms } from '../outils/helpers'

const AddBooking = () => {
    const [dateStart, setDateStart] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState(10);
    const [getPrice, setGetPrice] = useState (1);
    const [rooms, setRooms] = useState([]);
    const [type, setType] = useState('simple');
    const [number, setNumber] = useState(1);
    const [options, setOptions] = useState([]);

    const [availableRooms, setAvailableRooms] = useState(null);

    const [optionList, setOptionList] = useState([]);

    const getOptions = () => {
        axios({
            method: "get",
            url: "api/options",
            headers: {  
                'Authorization':'Bearer '+ localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response);
            const availableOptions = response.data;
            setOptionList(availableOptions);
        })
    }

    console.log(getRoles());

    useEffect(() => getOptions(), []);

    // check if rooms are available
    const handleSubmit = e => {
        e.preventDefault();

        const data = {
            dateStart:dateStart,
            endDate:endDate,
            price:price,
            type:type,
            options:options,
            number:number
        }
        console.log(data)
        axios({
            method: "get",
            url: `api/room/notbooking/${data.dateStart}/${data.endDate}/${data.type}`,
            data: data,
            headers: {  
                'Authorization':'Bearer '+ localStorage.getItem("token")
            }
        })
        // console.log(`api/room/notbooking/${data.dateStart}/${data.endDate}/${data.type}`)

        .then(res => {
            console.log(res.data)
            if (res.data.length >= number) {
                setAvailableRooms(res.data);
            }      
        })
        .catch(err => {
            // console.log(`api/room/notbooking/${data.dateStart}/${data.endDate}/${data.type}`)
            console.log(err)
        })

        if (availableRooms) {
            
            console.log(availableRooms);

            const idRooms = [];
            const idPrice = [];

            availableRooms.map((availableRooms) => (
               idRooms.push(availableRooms.id)
            ))

            console.log(idRooms.length+1);
            const array_rand = require('array_rand');
          
            const result = array_rand.getRandomObjectsInRangeSync(idRooms, number, 1, idRooms.length-1);
            array_rand.getRandomObjectsInRange(idRooms, number, 1, idRooms.length-1, function(err, result) {
          
                setRooms(result.map(item => `/api/rooms/${item}`)) ;
                // let getPrice = result.map(item => console.log(getPriceOfSelectedRooms(item))) ;
                console.log(rooms);
                // console.log(getPrice);
            });

            // console.log(result);
            // let getPrice = [];

            // result.map(item => getPriceOfSelectedRooms(item).push()) 

            // result.map((result) => (
            //     getPrice.push(getPriceOfSelectedRooms(result)) 
            // )
            useEffect(() =>{
                setGetPrice(getPriceOfSelectedRooms(43))
            })


            console.log(getPrice);

            // const bookingData = {
            //     dateStart:dateStart,
            //     endDate:endDate,
            //     totalPrice:price,
            //     options:options,
            //     rooms:rooms
            // }

            // axios({
            //     method: "post",
            //     url: "api/bookings",
            //     data: bookingData,
            //     headers: {  
            //         'Authorization':'Bearer '+ localStorage.getItem("token")
            //     }
            // })
            // .then(res => {
            //     console.log(res.data)
            // })
            // .catch(err => {
            //     // console.log(`api/room/notbooking/${data.dateStart}/${data.endDate}/${data.type}`)
            //     console.log(err)
            // })
        }
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
                                    <Form.Control type="text" placeholder="Insérez la date de début - AAAA-MM-JJ" name="dateStart" value={dateStart} onChange={(e) => setDateStart(e.target.value)}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Date de fin</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez la date de fin - AAAA-MM-JJ" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Nombre de chambre</Form.Label>
                                    <Form.Control type="number" placeholder="Insérez le nombre de chambre" value={number} onChange={(e) => setNumber(e.target.value)} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Type de chambre</Form.Label>
                                    <Form.Select aria-label="Type de chambre" onChange={e => setType(e.target.value)}>
                                        <option value="Simple">Simple</option>
                                        <option value="Double">Double</option>
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