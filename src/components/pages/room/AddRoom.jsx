import React, { useState } from 'react';

import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useHistory} from 'react-router-dom';

import axios from 'axios'; 
import { verifietoken } from '../../outils/helpers'



const AddRoom = () => {

    const [imageFile,setImageFile] = useState(null);
    const [number,setNumber] = useState();
    const [type,setType] = useState('simple');
    const [price,setPrice] = useState();
    const history = useHistory();

    const handleSubmit = e => {
        if(verifietoken()){
        e.preventDefault();
        console.log(imageFile);
        const data = new FormData();
        data.append('number',number);
        data.append('type',type);
        data.append('price',price);
        data.append('imageFile', imageFile);
        axios({
            method: "post",
            url: "api/rooms/with/image",
            data: data,
            headers: {  
                'Content-Type': 'multipart/form-data',
                'Authorization':'Bearer '+ localStorage.getItem("token")
            }
        })
        .then(res => {
            alert("la chambre est bien rajoutée")
            history.push("/room-list");
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
            alert("le numéro de la chambre existe déja")
        })
        }
        else{
            localStorage.clear()
            alert("Votre session est expirer")
            history.push("/login");
        }
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
                                <Form.Control type="file" onChange={event =>setImageFile(event.target.files[0])} />
                            </Form.Group>

                            <Form.Group controlId="number" className="mb-3">
                                <Form.Label>Numéro de la chambre *</Form.Label>
                                <Form.Control type="number" placeholder="Insérez le numéro de la chambre" onChange={e => setNumber(parseInt(e.target.value))} required/>
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
                                <Form.Control type="number" placeholder="Insérez le prix de la chambre" onChange={e => setPrice(parseFloat(e.target.value))} required/>
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

export default AddRoom;