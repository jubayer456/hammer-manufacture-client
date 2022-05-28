import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';
const Payment = () => {
    const { orderId } = useParams();
    const stripePromise =
        loadStripe('pk_test_51L4JARD2IOxGf7i4IzxCXM5VMFsFTdIkjFMWnBl53um4DWU8gKqiw5nXD20mrkr5H7HU0XekDiPg9V3r4Vu59V1U00tPTZkLMF');
    const { data: order, isLoading } = useQuery([Payment, orderId], () => fetch(`https://agile-chamber-23774.herokuapp.com/booking/${orderId}`
        , {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
    ).then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }

    return (

        <div>
            <div class="card w-96 bg-base-100 shadow-xl my-8">
                <div class="card-body">
                    <p className='text-success'>Hello {order.userName}</p>
                    <h2 class="card-title">Pay For {order.toolsName}</h2>
                    <p>Please pay ${order.price}</p>
                    <p >Your quantity is  <span className='text-yellow-500'>{order.quantity} </span></p>
                </div>
            </div>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                    </Elements>
                </div>
            </div>
        </div>

    );
};

export default Payment;