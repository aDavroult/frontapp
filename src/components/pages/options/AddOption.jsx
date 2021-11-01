import React, { useState } from 'react';

import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useHistory} from 'react-router-dom';
import axios from 'axios'; 
import { verifietoken } from '../../outils/helpers'




const AddOption = () => {

    const [name,setName] = useState();
    const [price,setPrice] = useState();
    const history = useHistory();
    const handleSubmit = e => {
        if(verifietoken()){
        e.preventDefault();

        const data = {
            name: name,
            price: price
        }
        axios({
            method: "post",
            url: "api/options",
            data: data,
            headers: {  
                'Authorization':'Bearer '+ localStorage.getItem("token")
            }
        })
        .then(res => {
            alert(" l'option est bien rajoutée ")
            history.push("/option-list");
            console.log(res.data)
        })
        .catch(err => {
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
                    <h1 className="mt-5 text-center blue">Ajouter une option</h1>
                    <Col className="p-5 m-auto rounded-lg">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail" className="mb-3">
                                <Form.Label>Nom de l'option *</Form.Label>
                                <Form.Control type="text" placeholder="Insérez le nom de l'option" onChange={e => setName(e.target.value)} required/>
                                <Form.Text className="text-muted">
                                    Ce champ est obligatoire.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className="mb-3">
                                <Form.Label>Prix de l'option *</Form.Label>
                                <Form.Control type="number" placeholder="Insérez le prix de l'option" onChange={e => setPrice(parseFloat(e.target.value))} required/>
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

export default AddOption;