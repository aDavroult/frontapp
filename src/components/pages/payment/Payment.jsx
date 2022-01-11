import React,{useState} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import { Container, Row, Col} from "react-bootstrap";

import {CheckoutForm} from './CheckoutForm';
import {useParams} from 'react-router-dom';




// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const PUBLIC_KEY = "pk_test_51Jw4n9ICVUZUxfdrVVC4aoqYrlC7W8cEa51wXLU5uo3AY9NMdGCMxUzRPE2DFozBTTaNJzFsOlUzZQT0pXjJ7n6r0024ns85AA";
const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function Payment(props) { 

const [finalPrice,setFinalPrice] = useState()
const params = useParams();
//get the data from AddBooking componenet
const data = props.location.state
  return (
    <div>
      <Container className="mb-5">
        <Row className="mt-5 form-box offset-md-3 col-md-6">
            <h2 className="my-5 text-center blue">Récapitulatif de votre commande</h2>
            <p className="text-center">Réservation du <span className="important"> {data.dateStart}</span> au <span className="important">{data.endDate} </span></p>
            <p className="text-center">Montant total : <span className="important"> {finalPrice} € </span></p> 
           
            <h1 className="my-5 text-center blue">Paiement</h1>
            <Container className="col-8 my-3">
              <Elements stripe={stripeTestPromise}>
                <CheckoutForm data={data} finalPrice={finalPrice} setFinalPrice={setFinalPrice} />
              </Elements>
            </Container>           
        </Row>
      </Container>
    </div>

  );
};