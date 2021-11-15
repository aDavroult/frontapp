import React, { useState, useEffect} from 'react';

import {Button, Col, Container, Form, Row, Carousel, Image} from "react-bootstrap";
import axios from 'axios'; 
import { verifietoken } from '../../outils/helpers'
import { useHistory, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/fontawesome-free-solid';

const ViewMyBooking = () => {

    const params = useParams();
    
    const [imageRooms,setImageRooms]=useState([])
    const [typeRooms,setTypeRooms]=useState([])
    const [optionsName,setOptionsName]=useState([])
    const [bookingsList, setBookingsList] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [options, setOptions] = useState([]);
    const [isDisplay, setIsDisplay] = useState(true);
    const [Display, setDisplay] = useState(true);
    
    
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
                setBookingsList(res.data)
                setRooms(res.data.rooms)
                setOptions(res.data.options)
                setIsDisplay(false)
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
        }, [params.id, isDisplay])
        //get the rooms reserved
        console.log(rooms)
        useEffect(()=> {
            
            rooms.map(rooms =>(         
                    axios({
                        method: "get",
                        url: rooms,
                        headers: {  
                            'Authorization':'Bearer '+ localStorage.getItem("token")
                        }
                    })
                    .then(res => {
                        console.log(res.data)
                    imageRooms.push(res.data.imageUrl)
                    typeRooms.push(res.data.type)
                        setTypeRooms(typeRooms)
                        setImageRooms(imageRooms)
                        
                    })
                    .catch(err =>{
                        console.log(err)
                    })
            ))
        })
        


console.log(imageRooms)
        //get the options reserved
console.log(rooms)
useEffect(()=> {
    
    options.map(options =>(         
            axios({
                method: "get",
                url: options,
                headers: {  
                    'Authorization':'Bearer '+ localStorage.getItem("token")
                }
            })
            .then(res => {
                console.log(res.data)
                optionsName.push(res.data.name)
                
                setOptionsName(optionsName)
                    
                
            })
            .catch(err =>{
                console.log(err)
            })
    ))
})
console.log(optionsName)
    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-3 col-md-6">
            
                        <Col className="p-5 m-auto rounded-lg">
                        <Carousel className="mt-3">
                        {(imageRooms.map(imageRooms=>(
                            <Carousel.Item >
                            <Image src={"https://apphot.herokuapp.com/" + imageRooms}  alt="image room" hight ="100%" width="100%"></Image>
                            </Carousel.Item>
                        ))) }
                        </Carousel>
                                </Col>
                            <Col className="col-md-12 text-center">
                            Chambre : {typeRooms[0]}
                            </Col>
                            <Col className="col-md-12 text-center">
                            Du : { new Date(bookingsList.dateStart).getDate()+ '/'+(new Date(bookingsList.dateStart).getMonth()+1)+'/'+new Date(bookingsList.dateStart).getFullYear()} A: {new Date(bookingsList.endDate).getDate()+ '/'+(new Date(bookingsList.endDate).getMonth()+1)+'/'+new Date(bookingsList.endDate).getFullYear()}
                            
                            </Col>
                            <Col className="col-md-12 text-center">
                            la date d'enregistrement : {new Date(bookingsList.createdAt).getDate()+ '/'+(new Date(bookingsList.createdAt).getMonth()+1)+'/'+new Date(bookingsList.createdAt).getFullYear()}
                            </Col>
                            <Col className="col-md-12 text-center">
                            Prix : {bookingsList.totalPrice}
                            </Col>
                            <Col className="col-md-12 text-center">
                                le Nombre de chambre : {rooms.length}
                            </Col>                            
                            {(optionsName.map((optionsName,id) =>(
                                <Col className="col-md-12 text-center">
                                    Option {id+1}:{optionsName}
                                </Col>
                            )))}
                            <Col className="col-md-12 text-center">
                                <Button variant="dark btn-block" type="submit">
                                    <Link className="white" to="/mes-reservations">Retour</Link>
                                </Button>
                            </Col>
                        </Row>
                    
                
            
            </Container>
        </>
    );
};

export default ViewMyBooking;