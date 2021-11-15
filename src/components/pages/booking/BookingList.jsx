import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button, Table} from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit,faTrash,faEye } from '@fortawesome/fontawesome-free-solid';


import axios from 'axios'; 
import { Link } from 'react-router-dom';
import {getUserForBooking} from '../../outils/helpers';
const BookingList = () => {

        const [bookingsList, setBookingsList] = useState([]);
        const [isDisplay, setIsDisplay] = useState(true);
        const [email, setEmail] = useState([]);
        const [displayBooking, setDisplayBooking] = useState(false);
        
        useEffect(() => {
            axios({
                method: "get",
                url: "api/bookings",
                headers: {  
                    'Authorization':'Bearer '+ localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log(response);
                const availableBookings = response.data;
                setBookingsList(availableBookings);
                
                setIsDisplay(false)
                
            })
        },(isDisplay));
    

    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-1 col-md-10 p-3">
                    <h1 className="mt-5 mb-5 text-center blue">Liste des Réservations</h1>
                    <Table responsive="md" className="text-center">
                        <thead>
                        <tr>
                            <th>Date enregistrement</th>
                            <th>Date début de réservation</th>
                            <th>Date fin de réservation</th>
                            <th>Prix </th>
                            
                            <th>Détail</th>
                            <th>Supprimer</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(bookingsList.map((bookingsList) => (
                                <tr>
                                    <td>{new Date(bookingsList.createdAt).getDate()+ '/'+(new Date(bookingsList.createdAt).getMonth()+1)+'/'+new Date(bookingsList.createdAt).getFullYear()}</td>
                                    <td>{new Date(bookingsList.dateStart).getDate()+ '/'+(new Date(bookingsList.dateStart).getMonth()+1)+'/'+new Date(bookingsList.dateStart).getFullYear()}</td>
                                    <td>{new Date(bookingsList.endDate).getDate()+ '/'+(new Date(bookingsList.endDate).getMonth()+1)+'/'+new Date(bookingsList.endDate).getFullYear()}</td>
                                    <td>{bookingsList.totalPrice}</td>
                                    <td><Link to={"/booking-view/"+ bookingsList.id}><FontAwesomeIcon icon={faEye} color="Tomato" /></Link></td>
                                    <td><Link to={"/booking-delete/"+ bookingsList.id}><FontAwesomeIcon icon={faTrash} color="Tomato" /></Link></td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </Table>
                </Row>
            </Container>
            
        </>
    );
};

export default BookingList;