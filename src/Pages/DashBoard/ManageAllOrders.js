import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import DeleteOrderAdminModal from './DeleteOrderAdminModal';
import ManageOrderRow from './ManageOrderRow';

const ManageAllOrders = () => {
    const [orderModal, setOrderModal] = useState(null);
    const navigate = useNavigate();
    const { data: orders, isLoading, refetch } = useQuery('AllOrders', () => fetch(`https://agile-chamber-23774.herokuapp.com/booking`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            toast.error(`${res.statusText} Access`);
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
            <h1 className='text-3xl py-5'>Manage All Orders</h1>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Client-Name</th>
                                <th>Product-Name</th>
                                <th>Product-price</th>
                                <th>Quantity</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, index) => <ManageOrderRow
                                    key={order._id}
                                    index={index + 1}
                                    order={order}
                                    setOrderModal={setOrderModal}
                                ></ManageOrderRow>)
                            }

                        </tbody>
                    </table>
                </div>
                {
                    orderModal && <DeleteOrderAdminModal
                        orderModal={orderModal}
                        refetch={refetch}
                        setDeleteModal={setOrderModal}
                    ></DeleteOrderAdminModal>
                }
            </div>
        </div>
    );
};

export default ManageAllOrders;