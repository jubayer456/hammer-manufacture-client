import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const { data: order, isLoading, refetch } = useQuery('order', () => {
        fetch(`http://localhost:5000/booking/${user.email}`).then(res => res.json())
    })

    return (
        <div>
            <h1 className='text-2xl py-4'>My order</h1>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Product-Name</th>
                            <th>Product-price</th>
                            <th>Product-quantity</th>
                            <th>Address</th>
                            <th>phnNum</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;