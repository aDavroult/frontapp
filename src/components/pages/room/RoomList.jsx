import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button, Table} from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEdit,faTrash } from '@fortawesome/fontawesome-free-solid';


import axios from 'axios'; 
import { Link } from 'react-router-dom';

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
                    <Table responsive="md" className="text-center table-striped">
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
                                    <td><Link to={"/room-view/"+ roomsList.id}><FontAwesomeIcon icon={faEye}/></Link></td>
                                    <td><Link to={"/room-edit/"+ roomsList.id}><FontAwesomeIcon icon={faEdit} /></Link></td>
                                    <td><Link to={"/room-delete/"+ roomsList.id}><FontAwesomeIcon icon={faTrash} className="tomato" /></Link></td>
                                    
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