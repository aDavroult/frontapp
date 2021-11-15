import {useStripe, useElements, PaymentElement, CardElement} from '@stripe/react-stripe-js';
import {element} from 'prop-types';

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        }) 
        if(!error){
            console.log("Token généré: ", paymentMethod);
        }
    }
        return (
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        hidePostalCode: true
                    }}
                />
                <button>Submit</button>
            </form>
        )
}