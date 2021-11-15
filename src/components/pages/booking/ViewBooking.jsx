import React, { useState, useEffect} from 'react';

import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import axios from 'axios'; 
import { verifietoken } from '../../outils/helpers'
import { useHistory, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/fontawesome-free-solid';

const ViewBooking = () => {

    const params = useParams();
    
    const [user,setUser]=useState()
    const [email,setEmail]=useState()
    const [firstName,setFirstName]=useState()
    const [lastName,setLastName]=useState()
    const [phone,setPhone]=useState()
    const [bookingsList, setBookingsList] = useState([]);
    
    const history = useHistory();
    
        useEffect(()=> {
            if(verifietoken()){
            axios({
                method: "get",
                url: `api/bookings/${params.id}`,
                headers: {  
                    'Authorization':'Bearer '+ localStorage.getItem("token")
                }
            })
            .then(res => {
                console.log(res.data)
                setUser(res.data.user)
                setBookingsList(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
            }
            else{
                localStorage.clear()
                alert("Votre session est expirer")
                history.push("/login");
            }

        }, [params.id])
         //get the firstname..
useEffect(()=>{

    if(user){
        axios({
            method: "get",
            url: user,
            headers: {  
                'Authorization':'Bearer '+ localStorage.getItem("token")
            }
        })
        .then(res => {  
            console.log(res.data)
            setEmail(res.data.email) 
            setFirstName(res.data.firstName)
            setLastName(res.data.lastName)
            setPhone(res.data.phone)
            
                            })
        .catch(err =>{
            console.log(err)
        })
            
    

    }
},[user])

    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-3 col-md-6">
                    <Col className="p-5 m-auto rounded-lg">
                    {email &&(
                        <Row>
                        
                            <Col className="col-md-12 text-center">
                                Nom : {lastName}
                            </Col>
                            <Col className="col-md-12 text-center">
                                Prénom : {firstName}
                            </Col>
                            <Col className="col-md-12 text-center">
                                Email : {email} 
                            </Col>
                            <Col className="col-md-12 text-center">
                                Téléphone : 0{phone} 
                            </Col>
                            <Col className="col-md-12 text-center">
                            Date début de réservation : {new Date(bookingsList.dateStart).getDate()+ '/'+(new Date(bookingsList.dateStart).getMonth()+1)+'/'+new Date(bookingsList.dateStart).getFullYear()}
                            </Col>
                            <Col className="col-md-12 text-center">
                            Date fin de réservation : {new Date(bookingsList.endDate).getDate()+ '/'+(new Date(bookingsList.endDate).getMonth()+1)+'/'+new Date(bookingsList.endDate).getFullYear()}
                            </Col>
                            <Col className="col-md-12 text-center">
                            Prix : {bookingsList.totalPrice}
                            </Col>
                            <Col className="col-md-12 text-center">
                                la date d'enregistrement : {new Date(bookingsList.createdAt).getDate()+ '/'+(new Date(bookingsList.createdAt).getMonth()+1)+'/'+new Date(bookingsList.createdAt).getFullYear()}
                            </Col>
                            <Col className="col-md-12 text-center">
                                le Nombre de chambre : {bookingsList.rooms.length}
                            </Col>
                            <Col className="col-md-12 text-center">
                            le Nombre d'option: {bookingsList.options.length}
                            </Col>
                            <Col className="col-md-12 text-center">
                                <Button variant="dark btn-block" type="submit">
                                    <Link className="red" to="/booking-list">Retour</Link>
                                </Button>
                            </Col>
                        </Row>
                    )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ViewBooking;