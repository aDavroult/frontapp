import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button, Table} from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEye } from '@fortawesome/fontawesome-free-solid';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import { faTrash } from '@fortawesome/fontawesome-free-solid'

import axios from 'axios'; 
import { Link } from 'react-router-dom';

const OptionList = () => {

        const [optionsList, setoptionsList] = useState([]);
        const [isDisplay, setIsDisplay] = useState(true);
        
        useEffect(() => {
            axios({
                method: "get",
                url: "api/options",
                headers: {  
                    'Authorization':'Bearer '+ localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log(response);
                const availableoptions = response.data;
                setoptionsList(availableoptions);
                setIsDisplay(false)
            })
        },(isDisplay));
        
    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-1 col-md-10 p-3">
                    <h1 className="mt-5 mb-5 text-center blue">Liste des Options</h1>
                    <Table responsive="md" className="text-center">
                        <thead>
                        <tr>
                            <th>Nom de l'option</th>
                            <th>Prix de l'option</th>
                            
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>
                        </thead>
                        <tbody>

                            {optionsList.map((optionsList) => (
                                <tr>
                                    <td>{optionsList.name}</td>
                                    <td>{optionsList.price}€</td>
                                    <td><Link to={"/option-edit/"+ optionsList.id}><FontAwesomeIcon icon={faEdit} /></Link></td>
                                    <td><Link to={"/option-delete/"+ optionsList.id}><FontAwesomeIcon icon={faTrash} color="Tomato" /></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
            
        </>
    );
};

export default OptionList;