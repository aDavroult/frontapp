import React, { useState } from 'react';

import {Button, Col, Container, Form, Row} from "react-bootstrap";

import axios from 'axios'; 

const Login = () => {

    const [imageFile,setImageFile] = useState('');
    const [number,setNumber] = useState('');
    const [type,setType] = useState('');
    const [price,setPrice] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            imageFile:imageFile,
            number:number,
            type:type,
            price:price
        }
        axios({
            method: "post",
            url: "https://apphot.herokuapp.com/api/rooms/with/image",
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
          })
        .then(res => {
            alert(res);
            console.log(res)
        })
        .catch(err => {
            alert(err);
            console.log(err)
        })
        console.log(imageFile);
        console.log(number);
        console.log(type);
        console.log(price);
    }

    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-3 col-md-6">
                    <h1 className="mt-5 text-center blue">Ajouter une chambre</h1>
                    <Col className="p-5 m-auto rounded-lg">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="imageFile" className="mb-3">
                                <Form.Label>Photos de la chambre</Form.Label>
                                <Form.Control type="file" multiple />
                            </Form.Group>

                            <Form.Group controlId="number" className="mb-3">
                                <Form.Label>Numéro de la chambre *</Form.Label>
                                <Form.Control type="number" placeholder="Insérez le numéro de la chambre" onChange={e => setNumber(e.target.value)} required/>
                                <Form.Text className="text-muted">
                                    Ce champ est obligatoire.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group as={Col} controlId="type" className="mb-3">
                                <Form.Label>Type de chambre *</Form.Label>
                                <Form.Select aria-label="Type de chambre" onChange={e => setType(e.target.value)} required>
                                    <option value="simple">Simple</option>
                                    <option value="double">Double</option>
                                </Form.Select>
                                <Form.Text className="text-muted">
                                    Ce champ est obligatoire.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="price" className="mb-3">
                                <Form.Label>Prix de la chambre *</Form.Label>
                                <Form.Control type="number" placeholder="Insérez le prix de la chambre" onChange={e => setPrice(e.target.value)} required/>
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