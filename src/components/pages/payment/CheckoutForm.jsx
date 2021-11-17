import {useStripe, useElements, PaymentElement, CardElement} from '@stripe/react-stripe-js';
import {element} from 'prop-types';
import {payment,addBooking} from '../../outils/helpers'
import {Button, Col, Container, Form, Row, Carousel, Image} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import axios from 'axios';


export const CheckoutForm = ({data}) => {
    const stripe = useStripe();
    const elements = useElements();
    const[pricesOption,setPricesOption]=useState([]);
    const [totalPriceOption, setTotalPriceOption] = useState();
    const [isDisplay, setisDisplay] = useState(true);
    
    const dateStart = data.dateStart
    const endDate = data.endDate
    const totalPrice = data.totalPrice
    const roomsbooking = data.roomsbooking
    const checkedValues = data.checkedValues
    
    //get price of option
    useEffect(()=>{
        
        checkedValues.map((item)=>{
            axios({
                method: "get",
                url: item,
            })
            .then(res => {  
                    pricesOption.push(res.data.price) 
                    setPricesOption(pricesOption)
                    console.log("ligne418",pricesOption)
                    const reducer = (previousValue, currentValue) => previousValue + currentValue;
                    setTotalPriceOption(pricesOption.reduce(reducer))
                    setisDisplay(false)
            })
            .catch(err =>{
                console.log(err)
            })
        })
            
    },(isDisplay))
    
    console.log("totalPriceOption",totalPriceOption) 
    console.log("totalprice",totalPrice)   
    const final = totalPriceOption+totalPrice
    console.log("finallll",final)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        }) 
        if(!error){
            console.log("Token généré: ", paymentMethod);
            payment(paymentMethod.id, final*100)
            addBooking(dateStart,endDate,final,roomsbooking,checkedValues)
            alert("payement réussi")

        }
        else{
            alert("payement pas réussi")
        }
    }
        return (
            <>
            <Container className="mb-5 mt-5">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        hidePostalCode: true
                    }}
                />
                <button class="btn btn-secondary mt-2">Paiement</button>
            </form>
            </Container>
            </>
        )
}