import React, { useState, useEffect, handleSubmit } from 'react';

import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import {useHistory} from 'react-router-dom';

import axios from 'axios'; 
import { verifietoken } from '../outils/helpers'

import { useParams } from "react-router-dom";



const ViewRoom = () => {

    const params = useParams();
    
    const [posts, setPosts] = useState([])
    
    const [imageUrl,setImageUrl] = useState(null);
    const [number,setNumber] = useState();
    const [type,setType] = useState();
    const [price,setPrice] = useState();
    const history = useHistory();
    
        useEffect(()=> {
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
        }, [params.id])

    return (
        <>
            <Container className="mb-5">
                <Row className="mt-5 form-box offset-md-3 col-md-6">
                    <h1 className="mt-5 text-center blue">Chambre {posts.id}</h1>
                    <Col className="p-5 m-auto rounded-lg">
                        <Row>
                            <Col className="col-md-12 text-center">
                                <Image src={"https://apphot.herokuapp.com" + imageUrl} width="100%"></Image>
                            </Col>
                            <Col className="col-md-12 text-center">
                                {number}
                            </Col>
                            <Col className="col-md-12 text-center">
                                {type}
                            </Col>
                            <Col className="col-md-12 text-center">
                                {price}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ViewRoom;