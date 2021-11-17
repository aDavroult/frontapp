import React,{useState} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

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
    <div class="m-2">
      <h1>Paiement</h1>
      <Elements stripe={stripeTestPromise}>
        <CheckoutForm data={data} finalPrice={finalPrice} setFinalPrice={setFinalPrice}/>
      </Elements>

      <h2>Récapitulatif de votre commande</h2>
      <p>Réservation du {data.dateStart} au {data.endDate}</p>
      <p>Montant total : {finalPrice} €</p>
    </div>

  );
};