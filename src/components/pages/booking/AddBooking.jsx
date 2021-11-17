import React, {useState, useEffect} from 'react';

import {Button, Col, Container, Form, Row, Carousel, Image} from "react-bootstrap";

import axios from 'axios';
import { Link,useHistory } from 'react-router-dom';
import ReactDOM from "react-dom";

import { getPriceOfSelectedRooms, verifietoken, addBooking, getAllRoom} from '../../outils/helpers'
import parking from '../../../images/parking.jpg'
import petitDej from '../../../images/petitDej.jpg'
import piscine from '../../../images/piscine.jpg'

import Payment from '../payment/Payment';

const AddBooking = () => {

    const[idsForBooking,setIdsForBooking] = useState([]);
    const [dateStart, setDateStart] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [rooms, setRooms] = useState([]);
    const [type, setType] = useState('simple');
    const [number, setNumber] = useState(1);
    const [prices, setPrices] = useState([]);
    const [options, setOptions] = useState([]);
    const [availableRooms, setAvailableRooms] = useState(null);
    const [allRooms, setAllRooms] = useState([]);
    const [isDisplay, setIsDisplay] = useState(true);
    const [isDisplayImage, setIsDisplayImage] = useState(true);
    const [Display, setDisplay] = useState(true);
    const [displayRooms, setDisplayRooms] = useState(true);

    const [optionList, setOptionList] = useState([]);
    const [checkedValues, setCheckedValues] = useState([]);
    const [allImageurl, setAllImageUrl] = useState([]);
    const history = useHistory();
    
//get all rooms
useEffect(()=>{
    if(verifietoken()){
        
        axios({
            method: "get",
            url: "api/rooms",
            headers: {  
                'Authorization':'Bearer '+ localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response);
            const allRooms = response.data;
            setAllRooms(allRooms);
            //get image of all rooms
            allRooms.map(allRooms => {
                allImageurl.push(allRooms.imageUrl)
                setAllImageUrl(allImageurl)
                console.log(allImageurl)
                
            })
            setDisplayRooms(false)
        })
    }
    else{
        localStorage.clear()
        alert("Votre session est expirer")
        history.push("/login");
    }
},(displayRooms));
console.log(allRooms.length)
console.log(allImageurl)
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
const dateStartn = new Date(dateStart).getTime();
console.log(dateStartn)
const endDatetn = new Date(endDate).getTime();

console.log(dateStart)
console.log(endDate.replace(/[/]/g, ['-']))

//get avalaible rooms
const handleSubmit = e => {
    e.preventDefault();
    //convert date to timestamp
if( dateStart && endDate){
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
        console.log(err)
    })
}
else{
    alert("la date de fin doit etre superieur à la date de début")
}
}
//select the roomsid from idRooms that user tapped in number and get rooms array like '/api/rooms/1'..
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
                setIdsForBooking(result);
                });
                rooms.push(result.map(item => `/api/rooms/${item}`))
                setRooms(rooms);
            }
            else
                if(idRooms.length == 0){
                    alert(`Veuilez changer la date de réservation et/ou le type de la chambre souhaiter` )
                    history.push("/reserver");
                }
                else {
                    alert(`Veuillez choisir un nombre de chambre inferieur à ${idRooms.length+1} ` )
                    history.push("/reserver");
                }
        }
    },[availableRooms]);

    ////calcul totalPrice/////
    
    useEffect(()=>{
        idsForBooking.map(item=>{
            
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
                    setTotalPrice(prices.reduce(function(a, b) { return a + b; }, 0)) 
                    
                console.log(totalPrice)
            })
            .catch(err => {
                console.log(err)
            })
            }
            )
    },[idsForBooking])

    //add booking
    useEffect(()=>{
        console.log("finish",prices); 
        if(totalPrice && prices.length==idsForBooking.length){
            addBooking(dateStart,endDate,totalPrice,rooms[0],checkedValues)
            alert(`La réservation est bien rajoutée` )
            history.push("/mes-reservations");
        }
    },[totalPrice])

    //get checked option 

    console.log(checkedValues);
        const handleChecked = e => {
            const optionListNew= optionList[e.target.dataset.id];
            let newCheckedValues = checkedValues.filter(item => item !== optionListNew);
            if (e.target.checked){
                newCheckedValues.push(`/api/options/${optionListNew.id}`);
                setCheckedValues(newCheckedValues);
            } 
            else{
                var index = checkedValues.indexOf(e.target.value)
                checkedValues.splice(index, 1); 
            }
            console.log(checkedValues)
        };
        
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
                                    <Form.Control type="text" placeholder="Insérez la date de début - JJ-MM-AAAA" name="dateStart" value={dateStart} onChange={(e) => setDateStart(e.target.value)}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Date de fin</Form.Label>
                                    <Form.Control type="text" placeholder="Insérez la date de fin - JJ-MM-AAAA" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
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
                                {allImageurl.map(allImageurl =>(
                                    <Carousel.Item >
                                        <Image src={"https://apphot.herokuapp.com" + allImageurl} height="300px" alt="image room" className="d-block w-100 hero"></Image>
                                    </Carousel.Item>
                                )) }
                            </Carousel>
                            
                        </Row>
                        <Row className="mt-3 mb-3 text-center">
                            <Col className="col-md-4">
                                <Image src={parking} width="100%"/>
                            </Col>
                            <Col className="col-md-4">
                                <Image src={petitDej} width="100%"/>
                            </Col>
                            <Col className="col-md-4">
                                <Image src={piscine} width="100%"/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Payment />
            </Container>
        </>
    );
};
export default AddBooking;