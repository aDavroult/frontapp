import React, { useState, useEffect} from 'react';

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory} from 'react-router-dom'; 
import { verifietoken, editUserData, getUserData, getCurrentUser } from '../../outils/helpers';
import { Link } from "react-router-dom";

const UserAccount = () => {

    const id = getCurrentUser();
    const [email,setEmail] = useState();
    const [plainPassword, setPlainPassword] = useState();
    const [repeatPlainPassword, setRepeatPlainPassword] = useState();
    const [firstName, setFirstName] = useState(); 
    const [lastName, setLastName] = useState(); 
    const [phone, setPhone] = useState();
    const history = useHistory();

    useEffect(()=> {
        // get the user's data to display it in the form before edit
        getUserData(id,setEmail,setFirstName,setLastName,setPhone)
    }, [id]) 
         
    const handleSubmit = e => {
        if(verifietoken()){ 
            e.preventDefault();

            if(plainPassword === repeatPlainPassword && plainPassword != null && repeatPlainPassword != null){
                editUserData(id, email, plainPassword, firstName, lastName, phone)

                alert("l'utilisateur a été modifié")
                    history.push("/");
            } else {
                alert('Vos mot de passes sont différents !');
            }
        }
        else{
            localStorage.clear()
            alert("Votre session à expirée")
            history.push("/login");
        }
    }
    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-3 col-md-6">
                    <Col className="p-5 m-auto rounded-lg">
                    <h1 className="mt-5 mb-5 text-center blue">Mon compte</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Email </Form.Label>
                                <Form.Control type="email" placeholder="Insérez votre Email" onChange={e => setEmail(e.target.value)} value={email} required/>
                                <Form.Text className="text-muted">
                                    Ce champ est obligatoire.
                                </Form.Text>
                            </Form.Group>
                            <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mot de passe </Form.Label>
                                    <Form.Control placeholder="Modifier votre mot de passe" onChange={e => setPlainPassword(e.target.value)} value={plainPassword}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Confirmer le mot de passe </Form.Label>
                                    <Form.Control placeholder="Confirmer le mot de passe" onChange={e => setRepeatPlainPassword(e.target.value)} value={repeatPlainPassword}/>
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Prénom </Form.Label>
                                <Form.Control placeholder="Insérez votre Prénom" onChange={e => setFirstName(e.target.value)} value={firstName}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nom </Form.Label>
                                <Form.Control placeholder="Insérez votre Nom" onChange={e => setLastName(e.target.value)} value={lastName}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Téléphone </Form.Label>
                                <Form.Control placeholder="Insérez votre Téléphone" onChange={e => setPhone(e.target.value)} value={phone}/>
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

export default UserAccount;