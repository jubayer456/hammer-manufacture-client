import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import DeleteProductModal from './DeleteProductModal';
import ProductRow from './ProductRow';

const AllProducts = () => {
    const [deleteModal, setDeleteModal] = useState(false);
    const navigate = useNavigate();
    const { data: orders, isLoading, refetch } = useQuery('AllTools', () => fetch('https://agile-chamber-23774.herokuapp.com/tools', {
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
            <h1 className='text-3xl py-5'>All products</h1>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Product-Name</th>
                                <th>Product-price</th>
                                <th>Min quantity</th>
                                <th>Available Quantity</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, index) => <ProductRow
                                    key={order._id}
                                    index={index + 1}
                                    order={order}
                                    setDeleteModal={setDeleteModal}
                                ></ProductRow>)
                            }

                        </tbody>
                    </table>
                </div>
                {
                    deleteModal && <DeleteProductModal
                        deleteModal={deleteModal}
                        refetch={refetch}
                        setDeleteModal={setDeleteModal}
                    ></DeleteProductModal>
                }
            </div>
        </div>
    );
};

export default AllProducts;