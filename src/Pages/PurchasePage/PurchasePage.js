import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PurchasePage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    fetch(`http://localhost:5000/tools/${id}`)
        .then(res => res.json())
        .then(data => setOrder(data))
    let min;
    const handelInput = (event) => {
        min = event.target.value;
    }
    return (
        <div className='p-12'>
            <h1 className='text-center text-4xl pb-10 mb-6'>Purchase page</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center items-center'>
                <img src={order.image} alt="" className='w-96' style={{ height: '450px' }} />
                <div className='text-xl'>
                    <h3 className='font-bold text-2xl'>Name: {order.name}</h3>
                    <h3 className='font-bold'>price: {order.price} $</h3>
                    <h3 className='font-bold'>amount of Quantity: <input onChange={handelInput} value={min < 10 ? 'disabled' : min} name='orderInput' type="number" placeholder="Type here" class="input input-bordered input-sm w-48 max-w-xs" /></h3>
                    <h3 className='font-bold'>Available Quantity: {order.price}</h3>
                    <p><span className='font-bold'>Description: </span>{order.description}</p>
                </div>
            </div>
        </div>
    );
};

export default PurchasePage;