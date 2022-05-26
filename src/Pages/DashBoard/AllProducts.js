import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DeleteProductModal from './DeleteProductModal';
import ProductRow from './ProductRow';

const AllProducts = () => {
    const [deleteModal, setDeleteModal] = useState(false);
    const { data: orders, isLoading, refetch } = useQuery('AllTools', () => fetch('http://localhost:5000/tools', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h1 className='text-2xl'>All products</h1>
            <div>
                <h1 className='text-2xl py-4'>My order</h1>
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