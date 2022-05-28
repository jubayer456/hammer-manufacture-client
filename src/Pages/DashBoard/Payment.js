import React from 'react';

const Payment = () => {
    return (

        <div>
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body">
                    <p className='text-success'>Hello ${ }</p>
                    <h2 class="card-title">Pay For { }</h2>
                    <p>Please pay { }</p>
                    <p >Your quantity is  <span className='text-orange-500'>{ } </span></p>
                </div>
            </div>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div class="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />
                    </Elements>
                </div>
            </div>
        </div>

    );
};

export default Payment;