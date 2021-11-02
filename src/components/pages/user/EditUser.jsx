import React, { useState, useEffect} from 'react';

import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useHistory} from 'react-router-dom'; 
import {verifietoken,editUser,getUser} from '../../outils/helpers';
import { useParams, Link } from "react-router-dom";






const Edituser = () => {

    const params = useParams();
    const [email,setEmail] = useState();
    const [roles,setRoles] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const history = useHistory();
    
        useEffect(()=> {
            //get the room to disply it in the form befor edit it
                getUser(params.id,setEmail,setRoles)
            
            
        }, [params.id])
        //get the roles of user selected 
        console.log(roles);
        useEffect(()=> {   
            for (var index = 0; roles[index]; index++) {
                console.log('index:', index, 'valeur:', roles[index]);
                if(roles[index]=="ROLE_ADMIN"){
                    setIsAdmin(true)
                    console.log(isAdmin)
                }
                if(roles[index]=="ROLE_USER"){
                    setIsUser(true)
                    console.log(isUser)
                }
            }
        }, [roles])
    const handleSubmit = e => {
        if(verifietoken()){
        e.preventDefault();
        const newroles=[];
        if(isAdmin){
            newroles.push("ROLE_ADMIN")
        }
        if(isUser){
            newroles.push("ROLE_USER")
        }
        console.log(email);
        console.log(newroles);
        editUser(params.id,email,newroles)
        alert("l'user' a été modifiée")
        history.push("/user-list");
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
                    <Col className="p-5 m-auto rounded-lg">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Email </Form.Label>
                                <Form.Control type="email" placeholder="Insérez votre Email" onChange={e => setEmail(e.target.value)} value={email} required/>
                                <Form.Text className="text-muted">
                                    Ce champ est obligatoire.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} controlId="roles" className="mb-3">
                                <Form.Label>Roles </Form.Label>
                                <br />
                                <Row className="mt-2">
                                <Col md={1} className="text-center">
                                <input
                                name="isAdmin"
                                type="checkbox"
                                checked={isAdmin}
                                onChange={e => setIsAdmin(e.target.checked)}
                                />
                                </Col>
                                <Col md={1} className="text-center ">
                                <label>
                                    Admin
                                </label>
                                </Col>
                                </Row>
                                <Row className="mt-2">
                                <Col md={1} className="text-center">
                                    <input
                                        name="isUser"
                                        type="checkbox"
                                        checked={isUser}
                                        onChange={e => setIsUser(e.target.checked)}
                                    />
                                </Col>
                                <Col md={1} className="text-center ">
                                <label>
                                    Utilisateur
                                </label>
                                </Col>
                                </Row>
                                <br />
                                
                                <Form.Text className="text-muted">
                                Ce champ est obligatoire.
                                </Form.Text>
                            </Form.Group>
                            <Row className="mt-5">
                                <Col md={6} className="text-center mb-3">
                                    <Button variant="dark btn-block" type="submit">
                                        <Link className="white" to="/user-list">RETOUR</Link>
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

export default Edituser;