import React, { useState, useEffect} from 'react';

import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import axios from 'axios'; 
import { verifietoken } from '../../outils/helpers'
import { useHistory, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/fontawesome-free-solid';

const ViewOption = () => {

    const params = useParams();
    
    const [name,setName] = useState();
    const [price,setPrice] = useState();
    const history = useHistory();
    
        useEffect(()=> {
            if(verifietoken()){
            axios({
                method: "get",
                url: `api/options/${params.id}`,
                headers: {  
                    'Authorization':'Bearer '+ localStorage.getItem("token")
                }
            })
            .then(res => {
                console.log(res)
                setName(res.data.name)
                setPrice(res.data.price)
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
                    <Col className="p-5 m-auto rounded-lg">
                        <Row>
                            <Col className="col-md-12 text-center">
                                Nom : {name}
                            </Col>
                            <Col className="col-md-12 text-center">
                                Prix : {price} €
                            </Col>
                            <Col className="col-md-12 text-center">
                                <Button variant="dark btn-block" type="submit">
                                    <Link className="white" to="/option-list">Retour</Link>

                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ViewOption;