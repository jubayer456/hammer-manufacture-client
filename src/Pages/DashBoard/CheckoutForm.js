import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const CheckoutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [successError, setSuccessError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const { _id, userName, price, email } = order;
    useEffect(() => {
        fetch(`https://agile-chamber-23774.herokuapp.com/create-payment-intent`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Barear ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            });
    }, [price])
    if (processing) {
        return <Loading></Loading>
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        setCardError(error?.message || '');
        setSuccessError('');
        // setProcessing(true);
        const { paymentIntent, error: intentErr } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: userName,
                        email: email
                    },
                },
            },
        );
        if (intentErr) {
            setCardError(intentErr?.message);
            setProcessing(false);
        }
        else {
            setSuccessError('Congrats Your payment is completed');
            toast.success('Congratulation Your payment is completed');
            setTransactionId(paymentIntent.id);
            console.log(paymentIntent);
            setCardError('');
            const payment = {
                OrderId: _id,
                transactionId: paymentIntent.id
            }
            fetch(`https://agile-chamber-23774.herokuapp.com/booking/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Barear ${localStorage.getItem('accessToken')}`
                }
            }).then(res => res.json(payment))
                .then(data => {
                    setProcessing(false);
                    console.log(data);
                })
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className='btn btn-success btn-sm my-4' disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red-500'>{cardError}</p>

            }
            {
                successError && <>
                    <p className='text-blue-400'>{successError}</p>
                    <p className='text-blue-700'>{transactionId}</p>
                </>
            }
        </>
    );
};

export default CheckoutForm;