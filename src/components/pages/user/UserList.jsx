import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button, Table} from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit,faTrash } from '@fortawesome/fontawesome-free-solid';


import axios from 'axios'; 
import { Link } from 'react-router-dom';

const UserList = () => {

        const [usersList, setusersList] = useState([]);
        const [isDisplay, setIsDisplay] = useState(true);
        
        useEffect(() => {
            axios({
                method: "get",
                url: "api/users",
                headers: {  
                    'Authorization':'Bearer '+ localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log(response);
                const availableusers = response.data;
                setusersList(availableusers);
                setIsDisplay(false)
            })
        },(isDisplay));
        
    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-1 col-md-10 p-3">
                    <h1 className="mt-5 mb-5 text-center blue">Liste des Utilisateurs</h1>
                    <Table responsive="md" className="text-center">
                        <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>
                        </thead>
                        <tbody>

                            {usersList.map((usersList) => (
                                <tr>
                                    <td>{usersList.email}</td>
                                    <td>{JSON.stringify(usersList.roles)}</td>
                                    <td><Link to={"/user-edit/"+ usersList.id}><FontAwesomeIcon icon={faEdit} /></Link></td>
                                    <td><Link to={"/user-delete/"+ usersList.id}><FontAwesomeIcon icon={faTrash} className="tomato" /></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
            
        </>
    );
};

export default UserList;