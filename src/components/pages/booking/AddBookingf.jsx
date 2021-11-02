import React, {useState, useEffect} from 'react';

import {Button, Col, Container, Form, Row, Carousel, Image} from "react-bootstrap";


import axios from 'axios';
import { Link,useHistory } from 'react-router-dom';

import { getPriceOfSelectedRooms,verifietoken,addBooking} from '../../outils/helpers'

const AddBooking = () => {
    let sum;
    const [dateStart, setDateStart] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(13);
    const [rooms, setRooms] = useState([]);
    const [type, setType] = useState('simple');
    const [number, setNumber] = useState(1);
    const [prices, setPrices] = useState([]);
    const [options, setOptions] = useState([]);

    const [availableRooms, setAvailableRooms] = useState(null);
    const [isDisplay, setIsDisplay] = useState(true);
    const [Display, setDisplay] = useState(true);

    const [optionList, setOptionList] = useState([]);
    const [checkedValues, setCheckedValues] = useState([]);

    
    const history = useHistory();
    //get Option
    useEffect(() => {
    if(verifietoken()){
        
        axios({
            method: "get",
            url: "api/options",
            headers: {  
                'Authorization':'Bearer '+ localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response);
            const availableOptions = response.data;
            setOptionList(availableOptions);
            setDisplay(false)
        })
    }
    else{
        localStorage.clear()
        alert("Votre session est expirer")
        history.push("/login");
    }
},(Display));

console.log(dateStart,endDate,type,isDisplay)

//get avalaible rooms


const handleSubmit = e => {
    e.preventDefault();

if(dateStart && endDate){
    // check if rooms are available
    const data = {
        dateStart:dateStart,
        endDate:endDate,
        type:type,
    }
    console.log(data)
    axios({
        method: "get",
        url: `api/room/notbooking/${data.dateStart}/${data.endDate}/${data.type}`,
        data: data,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
        console.log(res.data)
            setAvailableRooms(res.data);
            
    })
    .catch(err => {
        // console.log(`api/room/notbooking/${data.dateStart}/${data.endDate}/${data.type}`)
        console.log(err)
    })
}
}
//select the rooms from idRooms that user tapped in number
    useEffect(() => {
    if (availableRooms){
        const idRooms = [];
            availableRooms.map((availableRooms) => (
            idRooms.push(availableRooms.id)
        ))
        //select number element  from idRooms if idRooms.length is grether than number 
        if(idRooms.length >= number){
        const array_rand = require('array_rand');
        const result = array_rand.getRandomObjectsInRangeSync(idRooms, number, 0, idRooms.length-1);
        array_rand.getRandomObjectsInRange(idRooms, number, 0, idRooms.length-1, function(err, result) {
        console.log(result);
        });
        rooms.push(result.map(item => `/api/rooms/${item}`))
        setRooms(rooms);
        // let getPrice = result.map(item => console.log(getPriceOfSelectedRooms(item))) ;
        console.log(rooms);
        console.log(rooms[0])
        console.log(rooms.length)
        console.log(result)
        ////getPrice/////
    
            result.map(item=>{
            axios({
                method: "get",
                url: `api/rooms/${item}`,
                headers: {  
                    'Authorization':'Bearer '+ localStorage.getItem("token")
                }
            })
            .then(res => {
                console.log(res.data.price)
                prices.push(res.data.price)
                setPrices(prices);
                console.log(prices);
                sum = prices.reduce(function(a, b) { return a + b; }, 0)
                console.log("sums", sum)
                
                
            
            })
            .catch(err => {
                console.log(err)
            })
            })
        console.log(sum);
        console.log("finish", sum)//0
        ////////add booking/////
        
            addBooking(dateStart,endDate,sum= 13,rooms[0],checkedValues)
            alert(`La réservation est bien rajoutée` )
            history.push("/mes-reservations");
        /////////////
    }
    else{
        if(idRooms.length == 0){
            alert(`Veuilez changée la date de réservation et/ou le numero de la chambre souhaiter` )
            history.push("/reserver");
            console.log(getPriceOfSelectedRooms(86));
        }
        else {
            alert(`Veuillez choisir un nombre de chambre inferieur à ${idRooms.length+1} ` )
            history.push("/reserver");

        }
        
    }   
    }
},[availableRooms]);

        const handleChecked = e => {
        const optionListNew= optionList[e.target.dataset.id];
        let newCheckedValues = checkedValues.filter(item => item !== optionListNew);
        if (e.target.checked) newCheckedValues.push(`/api/options/${optionListNew.id}`);
        setCheckedValues(newCheckedValues);
        };
    console.log(checkedValues)
    return (
        <>
            <Container className="mb-5 mt-5">
                <Row>
                    <Col className="col-md-6 form-box">
                        <h1 className="mt-5 mb-2 text-center blue">Réservez !</h1>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Date de début</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez la date de début - AAAA-MM-JJ" name="dateStart" value={dateStart} onChange={(e) => setDateStart(e.target.value)}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Date de fin</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez la date de fin - AAAA-MM-JJ" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Nombre de chambre</Form.Label>
                                    <Form.Control type="number" placeholder="Insérez le nombre de chambre" value={number} onChange={(e) => setNumber(e.target.value)} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Type de chambre</Form.Label>
                                    <Form.Select aria-label="Type de chambre" onChange={e => setType(e.target.value)}>
                                        <option value="Simple">Simple</option>
                                        <option value="Double">Double</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <hr/>
                            <h3 className="blue mb-2">Nos options :</h3>
                            <Row>
                                {optionList.map((optionListNew,id) => (
                                    <Col className="col-md-4">
                                        <label key={id}>
                                        <input
                                            type="checkbox"
                                            className="mb-2"
                                            data-id={id} 
                                            onClick={handleChecked}
                                        />
                                        {optionListNew.name}
                                        </label>
                                    </Col>
                                ))}
                            </Row>
                            <Row className="mt-5">
                                <Col className="offset-md-3 col-md-6 text-center mb-3">
                                    <Button variant="dark btn-block" type="submit" className="white" >
                                        VALIDER
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col className="offset-md-1 col-md-5 form-box">
                        <Row>
                            <Carousel className="mt-3">
                                <Carousel.Item >
                                <img
                                    className="d-block w-100 hero"
                                    src="default-image.png"
                                    alt="First slide"
                                />
                                </Carousel.Item>
                                <Carousel.Item >
                                <img
                                    className="d-block w-100 hero"
                                    src="default-image.png"
                                    alt="Second slide"
                                />
                                </Carousel.Item>
                                <Carousel.Item >
                                <img
                                    className="d-block w-100 hero"
                                    src="default-image.png"
                                    alt="Third slide"
                                />
                                </Carousel.Item>
                            </Carousel>
                        </Row>
                        <Row className="mt-3 mb-3 text-center">
                            <Col className="col-md-4">
                                <Image src="default-placeholder.png" width="100%"/>
                            </Col>
                            <Col className="col-md-4">
                                <Image src="default-placeholder.png" width="100%"/>
                            </Col>
                            <Col className="col-md-4">
                                <Image src="default-placeholder.png" width="100%"/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default AddBooking;