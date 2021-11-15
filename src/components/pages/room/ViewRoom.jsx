import React, { useState, useEffect} from 'react';

import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import axios from 'axios'; 
import { verifietoken } from '../../outils/helpers'
import { useHistory, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/fontawesome-free-solid';

const ViewRoom = () => {

    const params = useParams();
    
    const [posts, setPosts] = useState([])
    const [imageUrl,setImageUrl] = useState(null);
    const [number,setNumber] = useState();
    const [type,setType] = useState();
    const [price,setPrice] = useState();
    const history = useHistory();
    
        useEffect(()=> {
            if(verifietoken()){
            axios({
                method: "get",
                url: `api/rooms/${params.id}`,
                headers: {  
                    'Authorization':'Bearer '+ localStorage.getItem("token")
                }
            })
            .then(res => {
                console.log(res)
                setPosts(res.data)
                setNumber(res.data.number)
                setType(res.data.type)
                setPrice(res.data.price)
                setImageUrl(res.data.imageUrl)
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
    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-3 col-md-6">
                    <h1 className="mt-5 text-center blue">Chambre {type}</h1>
                    <Col className="p-5 m-auto rounded-lg">
                        <Row>
                            <Col className="col-md-12 text-center">
                                {imageUrl &&(<Image src={"https://apphot.herokuapp.com/" + imageUrl}  alt="image room" width="100%"></Image>)}
                            </Col>
                            <Col className="col-md-12 text-center">
                                Numéro : {number}
                            </Col>
                            <Col className="col-md-12 text-center">
                                Prix : {price} €
                            </Col>
                            <Col className="col-md-12 text-center">
                                <Button variant="dark btn-block" type="submit">
                                    <Link className="white" to="/room-list">Retour</Link>

                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ViewRoom;