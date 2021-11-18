import React, {useState, useEffect} from 'react';

import {Button, Col, Container, Form, Row, Carousel, Image} from "react-bootstrap";


import axios from 'axios';
import { Link,useHistory } from 'react-router-dom';
import ReactDOM from "react-dom";

import { verifietoken} from '../../outils/helpers'
import parking from '../../../images/parking.jpg'
import petitDej from '../../../images/petitDej.jpg'
import piscine from '../../../images/piscine.jpg'



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
    const[pricesOption,setPricesOption]=useState([]);
    const [totalPriceOption, setTotalPriceOption] = useState(0);
    const history = useHistory();
    
    const now = new Date();
    const nowc = now.getFullYear()+'-'+(now.getMonth()+1)+ '-'+now.getDate()
    console.log("nowwwwwwwwwwww",now.getFullYear()+'-'+(now.getMonth()+1)+ '-'+now.getDate())

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
            const allRooms = response.data;
            setAllRooms(allRooms);
            //get image of all rooms
            allRooms.map(allRooms => {
                allImageurl.push(allRooms.imageUrl)
                setAllImageUrl(allImageurl)
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

//get avalaible rooms
const handleSubmit = e => {
    e.preventDefault();
//const nowc = now.replace(/[/]/g, ['-'])
/* console.log("date debut",(new Date(dateStart))) */
/* console.log("date de fin",new Date (endDate)) */
/* console.log("date debut avec number",Number(new Date(new Date(dateStart)))) */
/* console.log("date de fin avec number",Number(new Date(new Date (endDate)))) */
/* console.log("comparaison des date",Number(new Date(new Date(dateStart)))< Number(new Date(new Date (endDate)))) */
/* console.log(new Date().getTime()) */
/* console.log(new Date(dateStart).getTime(),new Date(endDate).getTime(),new Date(nowc).getTime()) */
/*  */

if((dateStart < endDate)){
    const data = {
        dateStart:dateStart,
        endDate:endDate,
        type:type,
    }
    axios({
        method: "get",
        url: `api/room/notbooking/${data.dateStart}/${data.endDate}/${data.type}`,
        data: data,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
        setAvailableRooms(res.data);    
    })
    .catch(err => {
        console.log(err)
    })
}

else{
    alert("Veuillez vérifier les dates")
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
                prices.push(res.data.price)
                setPrices(prices); 
                setTotalPrice(prices.reduce(function(a, b) { return a + b; }, 0)) 
            })
            .catch(err => {
                console.log(err)
            })
            }
            )
    },[idsForBooking])  

    //get checked option 
    
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
        };
    

    //go to payment page

    useEffect(()=>{ 
        const roomsbooking =rooms[0]
        const data={
            dateStart:dateStart,
            endDate:endDate,
            totalPrice:totalPrice,
            roomsbooking :roomsbooking,
            checkedValues :checkedValues,
            
        }
        if(totalPrice && prices.length==idsForBooking.length){
            history.push("/payment",data)
        }
    },[totalPrice])

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
                                    <Form.Control min={nowc} type="date" placeholder="Insérez la date de début - JJ-MM-AAAA" name="dateStart" value={dateStart} onChange={(e) => setDateStart(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Date de fin</Form.Label>
                                    <Form.Control min={dateStart} type="date" placeholder="Insérez la date de fin - JJ-MM-AAAA" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required/>
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
                                        <Image src={axios.defaults.baseURL + allImageurl} hight="100%" alt="image room" className="d-block w-100 hero"></Image>
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
            </Container>
        </>
    );
};
export default AddBooking;