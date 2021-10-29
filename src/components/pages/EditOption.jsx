import React, { useState, useEffect} from 'react';

import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useHistory} from 'react-router-dom';

import axios from 'axios'; 
import {verifietoken,editRoom,getRoom} from '../outils/helpers';
import { useParams, Link } from "react-router-dom";





const EditOption = () => {

    const params = useParams();
    const [posts, setPosts] = useState([])
    const [imageFile,setImageFile] = useState(null);
    const [number,setNumber] = useState();
    const [type,setType] = useState();
    const [price,setPrice] = useState();
    const history = useHistory();
    
        useEffect(()=> {
            //get the room to disply it in the form befor edit it
                getRoom(params.id,setPosts,setNumber,setType,setPrice,setImageFile)
            //edit room
            
        }, [params.id])
    
    const handleSubmit = e => {
        if(verifietoken()){
        e.preventDefault();
        editRoom(params.id,number,type,price,imageFile)
        alert("la chambre a été modifiée")
        history.push("/room-list");
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
                    <h1 className="mt-5 text-center blue">Modifier la chambre {posts.id}</h1>
                    <Col className="p-5 m-auto rounded-lg">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="imageFile" className="mb-3">
                                <Form.Label>Photos de la chambre</Form.Label>
                                <Form.Control type="file" onChange={event =>setImageFile(event.target.files[0])} />
                            </Form.Group>
                            <Form.Group controlId="number" className="mb-3">
                                <Form.Label>Numéro de la chambre *</Form.Label>
                                <Form.Control type="number" placeholder="Insérez le numéro de la chambre" onChange={e => setNumber(parseInt(e.target.value))} value={number} required/>
                                <Form.Text className="text-muted">
                                    Ce champ est obligatoire.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} controlId="type" className="mb-3">
                                <Form.Label>Type de chambre *</Form.Label>
                                <Form.Select aria-label="Type de chambre" onChange={e => setType(e.target.value)} value={type} required >
                                    <option value="simple">Simple</option>
                                    <option value="double">Double</option>
                                </Form.Select>
                                <Form.Text className="text-muted">
                                    Ce champ est obligatoire.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="price" className="mb-3">
                                <Form.Label>Prix de la chambre *</Form.Label>
                                <Form.Control type="number" placeholder="Insérez le prix de la chambre" onChange={e => setPrice(parseFloat(e.target.value))} value={price} required/>
                                <Form.Text className="text-muted">
                                    Ce champ est obligatoire.
                                </Form.Text>
                            </Form.Group>

                            <Row className="mt-5">
                                <Col md={6} className="text-center mb-3">
                                    <Button variant="dark btn-block" type="submit">
                                        <Link className="white" to="/room-list">RETOUR</Link>
                                    </Button>
                                </Col>
                                <Col md={6} className="text-center mb-3">
                                    <Button variant="dark btn-block" type="submit" className="white">
                                        Modifier
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

export default EditOption;