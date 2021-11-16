import {useStripe, useElements, PaymentElement, CardElement} from '@stripe/react-stripe-js';
import {element} from 'prop-types';
import {payment} from '../../outils/helpers'

export const CheckoutForm = ({data,roomstobdd}) => {
    const stripe = useStripe();
    const elements = useElements();
    console.log(roomstobdd)
    console.log("dataincheckoform",data)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        }) 
        if(!error){
            console.log("Token généré: ", paymentMethod);
            console.log(paymentMethod.id)
            payment(paymentMethod.id, 100)
           // addBooking(dateStart,endDate,totalPrice,roomstobdd,checkedValues)

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