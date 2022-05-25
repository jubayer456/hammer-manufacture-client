import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';


const PurchasePage = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams();

    const [error, setError] = useState('');
    const { data: order, isLoading, refetch } = useQuery('tools', () => fetch(`http://localhost:5000/tools/${id}`).then(res => res.json()));

    if (isLoading) {
        return <Loading />

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.quantity.value <= order.availableQuantity && event.target.quantity.value >= order.minOrderQuantity) {
            const purchaseOrder = {
                userName: user.displayName,
                email: user.email,
                toolsName: event.target.orderName.value,
                price: event.target.price.value,
                quantity: event.target.quantity.value,
                address: event.target.address.value,
                phnNum: event.target.phnNum.value
            }
            fetch('http://localhost:5000/booking', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(purchaseOrder)
            })
                .then(res => res.json())
                .then(book => {
                    const available = order.availableQuantity - event.target.quantity.value;
                    const updateTools = { available };
                    fetch(`http://localhost:5000/tools/${id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(updateTools)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            refetch();
                        })
                    setError('');
                    toast.success('Successfully purchase order');
                })
        }
        else {
            if (order.minOrderQuantity > event.target.quantity) {
                setError('Enter a minimum Quantity');
                toast.error('Enter a minimum Quantity')
            }
            else {
                setError('Reduce the  Quantity');
                toast.error('Reduce the  Quantity')
            }
        }
    };

    return (
        <div className='p-12'>
            <h1 className='text-center text-4xl pb-10 mb-6'>Purchase page</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center items-center'>
                <img src={order.image} alt="" className='w-96' style={{ height: '450px' }} />
                <div className='text-xl'>
                    <h3 className='font-bold text-2xl'>Name: {order.name}</h3>
                    <h3 className='font-bold'>price: {order.price} $</h3>
                    <h3 className='font-bold'>order of min Quantity: 10</h3>
                    <h3 className='font-bold'>Available Quantity: {order.availableQuantity}</h3>
                    <p><span className='font-bold'>Description: </span>{order.description}</p>
                </div>

            </div>
            <div >
                <h2 className='text-center text-3xl my-5'>Fill the Purchase Form</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input type='text'
                        name='name'
                        className='input input-bordered w-full max-w-xs mx-auto'
                        value={user.displayName}
                    />
                    <input type='email' name='email'
                        className='input input-bordered w-full max-w-xs mx-auto'
                        value={user.email}
                    />

                    <input
                        type='text'
                        name='orderName'
                        className='input input-bordered w-full max-w-xs mx-auto'
                        value={order.name}
                    />
                    <input
                        type='text'
                        name='price'
                        className='input input-bordered w-full max-w-xs mx-auto'
                        value={order.price}
                    />
                    <div class="form-control w-full max-w-xs mx-auto">
                        <input
                            type='number'
                            placeholder='Quantity'
                            name='quantity'
                            defaultValue='10'
                            className='input input-bordered w-full max-w-xs'
                            required
                        />
                        <p class="label-text text-red-500">{error}</p>

                    </div>
                    <input
                        type='text'
                        name='address'
                        placeholder='address'
                        className='input input-bordered w-full max-w-xs mx-auto'
                        required
                    />
                    <input
                        type='text'
                        name='phnNum'
                        placeholder='Phone Number'
                        className='input input-bordered w-full max-w-xs mx-auto'
                        required
                    />

                    <input type="submit" value='Submit' class="mx-auto btn w-full max-w-xs" />

                </form>
            </div>
        </div>
    );
};

export default PurchasePage;