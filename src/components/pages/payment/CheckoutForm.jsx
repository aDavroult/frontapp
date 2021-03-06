import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {payment,addBooking} from '../../outils/helpers'
import {Container} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link,useHistory } from 'react-router-dom';


export const CheckoutForm = ({data,finalPrice,setFinalPrice}) => {
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const [pricesOption,setPricesOption] = useState([]);
    const [totalPriceOption, setTotalPriceOption] = useState(0);
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
    setFinalPrice(totalPriceOption+totalPrice)
    console.log("finallll",finalPrice)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        }) 
        if(!error){
            console.log("Token g??n??r??: ", paymentMethod);
            payment(paymentMethod.id, finalPrice*100)
            addBooking(dateStart,endDate,finalPrice,roomsbooking,checkedValues)
            alert("Paiement r??ussi")
            history.push("/mes-reservations");
        }
        else{
            alert("Le paiement ?? ??chou??, merci de r??essayer.")
            history.push("/reserver");   
        }
    }
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            hidePostalCode: true
                        }}
                    />
                    <Container className="mt-3 text-center">
                        <button class="white btn btn-dark btn-block mt-2">Payer</button>   
                    </Container>             
                </form>
            </div>
        )
}