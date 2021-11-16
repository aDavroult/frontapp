import {useStripe, useElements, PaymentElement, CardElement} from '@stripe/react-stripe-js';
import {element} from 'prop-types';
import {payment,addBooking} from '../../outils/helpers'

export const CheckoutForm = ({data}) => {
    const stripe = useStripe();
    const elements = useElements();
    
    const dateStart = data.dateStart
    const endDate = data.endDate
    const totalPrice = data.totalPrice*100
    const roomstobdd = data.roomstobdd
    const checkedValues = data.checkedValues

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        }) 
        if(!error){
            console.log("Token généré: ", paymentMethod);
            console.log(paymentMethod.id)
            payment(paymentMethod.id, totalPrice)
            addBooking(dateStart,endDate,totalPrice,roomstobdd,checkedValues)

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