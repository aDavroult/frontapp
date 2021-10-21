import React from 'react';

import {Container, Row, Col, Button, Table} from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEye } from '@fortawesome/fontawesome-free-solid';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import { faTrash } from '@fortawesome/fontawesome-free-solid'

import axios from 'axios'; 

const RoomList = () => {
    
        axios({
            method: "get",
            url: "api/rooms",
            headers: {  
                'Authorization':'Bearer '+ localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
        
    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-1 col-md-10 p-3">
                    <h1 className="mt-5 mb-5 text-center blue">Liste des chambres</h1>
                    <Table responsive="md" className="text-center">
                        <thead>
                        <tr>
                            <th>Numéro de la chambre</th>
                            <th>Type de chambre</th>
                            <th>Prix de la chambre</th>
                            <th>Voir</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>1</td>
                                <td>Simple</td>
                                <td>49€</td>
                                <td><a href="room-list"><FontAwesomeIcon icon={faEye}/></a></td>
                                <td><a href="room-list"><FontAwesomeIcon icon={faEdit} /></a></td>
                                <td><a href="room-list"><FontAwesomeIcon icon={faTrash} /></a></td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
            
        </>
    );
};

export default RoomList;