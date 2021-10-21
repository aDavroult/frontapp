import React, { useEffect,useState } from 'react';

import {Container, Row, Col, Button, Table} from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEye } from '@fortawesome/fontawesome-free-solid';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import { faTrash } from '@fortawesome/fontawesome-free-solid'

import axios from 'axios'; 

const RoomList = () => {

        const [roomsList, setRoomsList] = useState([]);
        const [isDisplay, setIsDisplay] = useState(true);
        
        useEffect(() => {
            axios({
                method: "get",
                url: "api/rooms",
                headers: {  
                    'Authorization':'Bearer '+ localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log(response);
                const availableRooms = response.data;
                setRoomsList(availableRooms);
                setIsDisplay(false)
            })
        },(isDisplay));
        
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

                            {roomsList.map((roomsList) => (
                                <tr>
                                    <td>{roomsList.number}</td>
                                    <td>{roomsList.type}</td>
                                    <td>{roomsList.price}€</td>
                                    <td><a href={"/room-view/"+ roomsList.id}><FontAwesomeIcon icon={faEye}/></a></td>
                                    <td><a href={"/room-edit/"+ roomsList.id}><FontAwesomeIcon icon={faEdit} /></a></td>
                                    <td><a href={"/rooms/"+ roomsList.id}><FontAwesomeIcon icon={faTrash} /></a></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
            
        </>
    );
};

export default RoomList;