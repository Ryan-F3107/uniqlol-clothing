import { PaymentFormContainer, FormContainer } from './payment-form.styles';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import Button, {BUTTON_TYPE_CLASS} from '../button/button.component';
const PaymentForm= () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const paymentHandler = async (e: FormEvent<HTMLElement>) =>{
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        setIsProcessingPayment(true);   //set to true
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount * 100}),
        }).then((res) => {return res.json()});
        const cardDetails = elements.getElement(CardElement);
        if(cardDetails === null) return;    //check if cardDetail is null-- type safeguard
        const clientSecret = response.paymentIntent.client_secret;
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                }
            }
        });
        setIsProcessingPayment(false);
        if(paymentResult.error){
            alert(paymentResult.error)
        } else {
            if(paymentResult.paymentIntent.status === "succeeded"){
                alert("payment successful");
            }
        }
    }
    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment:</h2>
                <CardElement/>
                <Button
                    isLoading = {isProcessingPayment}
                    buttonType={BUTTON_TYPE_CLASS.inverted}>Pay Now</Button>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;