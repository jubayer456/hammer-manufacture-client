import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import DeleteOrderModal from './DeleteOrderModal';
import OrderRow from './OrderRow';
const MyOrders = () => {
    const [user] = useAuthState(auth);
    const [deleteModal, setDeleteModal] = useState(false);
    const navigate = useNavigate();
    const { data: orders, isLoading, refetch } = useQuery('order', () => fetch(`http://localhost:5000/booking?email=${user.email}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        console.log('response of My bookings', res);
        if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem('accessToken');
            navigate('/home');
        }
        return res.json();
    }));
    if (isLoading) {
        return <Loading></Loading>
    }

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
                            <th>Product-quantity</th>
                            <th>Product-price</th>
                            <th>phnNum</th>
                            <th>Address</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => <OrderRow
                                key={order._id}
                                index={index + 1}
                                order={order}
                                setDeleteModal={setDeleteModal}
                            ></OrderRow>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deleteModal && <DeleteOrderModal
                    deleteModal={deleteModal}
                    refetch={refetch}
                    setDeleteModal={setDeleteModal}
                ></DeleteOrderModal>
            }
        </div>
    );
};

export default MyOrders;