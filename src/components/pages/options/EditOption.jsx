import React, { useState, useEffect} from 'react';

import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useHistory} from 'react-router-dom'; 
import {verifietoken,editOption,getOption} from '../../outils/helpers';
import { useParams, Link } from "react-router-dom";





const EditOption = () => {

    const params = useParams();
    const [name,setName] = useState();
    const [price,setPrice] = useState();
    const history = useHistory();
    
        useEffect(()=> {
            //get the room to disply it in the form befor edit it
                getOption(params.id,setName,setPrice)
            //edit room
            
        }, [params.id])
    
    const handleSubmit = e => {
        if(verifietoken()){
        e.preventDefault();
        editOption(params.id,name,price)
        alert("l'option' a été modifiée")
        history.push("/option-list");
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
                    <h1 className="mt-5 text-center blue">Modifier  {name}</h1>
                    <Col className="p-5 m-auto rounded-lg">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Nom *</Form.Label>
                                <Form.Control type="name" placeholder="Insérez le nom de l'option" onChange={e => setName(e.target.value)} value={name} required/>
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