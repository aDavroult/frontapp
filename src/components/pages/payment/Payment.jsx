import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import {CheckoutForm} from './CheckoutForm';
import {useParams} from 'react-router-dom';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const PUBLIC_KEY = "pk_test_51Jw4n9ICVUZUxfdrVVC4aoqYrlC7W8cEa51wXLU5uo3AY9NMdGCMxUzRPE2DFozBTTaNJzFsOlUzZQT0pXjJ7n6r0024ns85AA";
const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function Payment(roomstobdd) {
//   const options = {
//     // passing the client secret obtained from the server
//     clientSecret: '{{CLIENT_SECRET}}',
//   };

//   sk_test_51Jw4n9ICVUZUxfdrx2vjoMmEgm7TzIOqIO6u9bp6KZnnaUfrrTx1UyessURbzUwtIKkVJVkVwqAiC5bL3i4mojLS00GSNDIrcZ
const params = useParams();
const data = params.data;
console.log(data)


  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm totalPrice={data}  />
    </Elements>
  );
};