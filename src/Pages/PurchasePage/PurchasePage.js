import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';


const PurchasePage = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams();

    const [error, setError] = useState('');
    const { data: order, isLoading, refetch } = useQuery('tools', () => fetch(`https://agile-chamber-23774.herokuapp.com/tools/${id}`).then(res => res.json()));

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
                price: event.target.price.value * event.target.quantity.value,
                quantity: event.target.quantity.value,
                address: event.target.address.value,
                phnNum: event.target.phnNum.value
            }
            fetch('https://agile-chamber-23774.herokuapp.com/booking', {
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
                    fetch(`https://agile-chamber-23774.herokuapp.com/tools/${id}`, {
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
                <div className='flex justify-center'>
                    <img src={order.image} alt="" className='w-72' style={{ height: '350px' }} />
                </div>
                <div className='text-xl'>
                    <h3 className='font-bold text-2xl'>Name: {order.name}</h3>
                    <h3 className='font-bold'>price: {order.price} $</h3>
                    <h3 className='font-bold'>order of min Quantity: 10</h3>
                    <h3 className='font-bold'>Available Quantity: {order.availableQuantity}</h3>
                    <p><span className='font-bold'>Description: </span>{order.description}</p>
                </div>

            </div>
            <div className="card w-96  bg-base-100 shadow-xl mx-auto my-8">
                <div className="card-body">
                    <h2 className='text-center text-3xl my-5'>Fill the Purchase Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div class="form-control w-full max-w-lg">
                            <label class="label">
                                <span class="label-text">Your Name:</span>
                            </label>
                            <input type='text'
                                name='name'
                                className='input input-bordered w-full max-w-xs '
                                value={user.displayName}
                                readOnly
                            />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Your Email:</span>
                            </label>
                            <input type='email' name='email'
                                className='input input-bordered w-full max-w-xs '
                                value={user.email}
                                readOnly
                            />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Product Name:</span>
                            </label>
                            <input
                                type='text'
                                name='orderName'
                                className='input input-bordered w-full max-w-xs '
                                value={order.name}
                            />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Product Price:</span>
                            </label>
                            <input
                                type='text'
                                name='price'
                                className='input input-bordered w-full max-w-xs '
                                value={order.price}
                            />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Order to minimum Quantity:</span>
                            </label>
                            <input
                                type='number'
                                placeholder='Quantity'
                                name='quantity'
                                defaultValue='10'
                                className='input input-bordered w-full max-w-xs'
                                required
                            />
                            <p className="label-text text-red-500">{error}</p>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Your Address:</span>
                            </label>
                            <input
                                type='text'
                                name='address'
                                placeholder='address'
                                className='input input-bordered w-full max-w-xs '
                                required
                            />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Your Phone Number:</span>
                            </label>
                            <input
                                type='text'
                                name='phnNum'
                                placeholder='Phone Number'
                                className='input input-bordered w-full max-w-xs'
                                required
                            />
                        </div>
                        <input type="submit" value='Submit' className="mt-4 btn w-full max-w-xs" />
                    </form>
                </div>

            </div>

        </div>
    );
};

export default PurchasePage;