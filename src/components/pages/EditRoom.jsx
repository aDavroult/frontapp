import React, { useState, useEffect, handleSubmit } from 'react';

import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useHistory} from 'react-router-dom';

import axios from 'axios'; 
import { verifietoken } from '../outils/helpers'

import { useParams } from "react-router-dom";



const EditRoom = () => {

    const params = useParams();
    
    const [posts, setPosts] = useState([])
    
    const [imageFile,setImageFile] = useState(null);
    const [number,setNumber] = useState();
    const [type,setType] = useState();
    const [price,setPrice] = useState();
    const history = useHistory();
    
        useEffect(()=> {
            axios({
                method: "get",
                url: `api/rooms/${params.id}`,
                headers: {  
                    'Authorization':'Bearer '+ localStorage.getItem("token")
                }
            })
            .then(res => {
                console.log(res)
                setPosts(res.data)
                setNumber(res.data.number)
                setType(res.data.type)
                setPrice(res.data.price)
            })
            .catch(err =>{
                console.log(err)
            })
        }, [params.id])

    const handleSubmit = e => {
        if(verifietoken()){
        e.preventDefault();
        const data = {
            number:number,
            type:type,
            price:price
        }
        axios({
            method: "put",
            url: `api/rooms/${params.id}`,
            data: data,
            headers: {  
                'Authorization':'Bearer '+ localStorage.getItem("token")
            }
        })
        .then(res => {
            alert("la chambre a été modifiée")
            console.log(res.data)
        })
        .catch(err => {
            alert(err);
            console.log(err)
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
                                <Col md={12} className="text-center mb-3">
                                    <Button variant="dark btn-block" type="submit" className="white">
                                        MODIFIER
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

export default EditRoom;