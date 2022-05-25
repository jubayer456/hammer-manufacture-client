import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';

// import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import DeleteOrderModal from './DeleteOrderModal';
import OrderRow from './OrderRow';
const MyOrders = () => {
    const [user] = useAuthState(auth);
    const [deleteModal, setDeleteModal] = useState(false);
    const { data: orders, isLoading, refetch } = useQuery('order', () => fetch(`http://localhost:5000/booking?email=${user.email}`).then(res => res.json()));
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
                                index={index + 1}
                                order={order}
                                refetch={refetch}
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