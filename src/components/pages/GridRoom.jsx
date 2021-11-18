import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';


import axios from 'axios'; 
import { Link } from 'react-router-dom';


const GridRoom = () => {

    const [roomsList, setRoomsList] = useState([]);
    const [isDisplay, setIsDisplay] = useState(true);
    
    useEffect(() => {
        axios({
            method: "get",
            url: "api/rooms"
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
                <Row className="mt-5 text-center">
                    <h1 className="purple">Liste de nos chambres</h1>
                    {roomsList.map((roomsList) => (
                        <Col md={3} className="mt-3 mb-5">
                            <Card >
                                {roomsList.imageUrl &&(<Card.Img variant="top" height="200px"  src={axios.defaults.baseURL + roomsList.imageUrl}  />)}
                                <Card.Body>
                                    <Card.Title>Chambre n°{roomsList.number}</Card.Title>
                                    <Card.Text>
                                        {roomsList.type}
                                    </Card.Text>
                                    <Button className="text-center white" variant="dark">Voir</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        
    </>
);
};

export default GridRoom; 