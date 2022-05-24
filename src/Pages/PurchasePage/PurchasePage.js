import { registerVersion } from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const PurchasePage = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        fetch(`http://localhost:5000/tools/${id}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, []);

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        if (data.quantity <= order.availableQuantity && data.quantity >= order.minOrderQuantity) {
            const purchaseOrder = {
                userName: user.displayName,
                email: user.email,
                toolsName: data.orderName,
                price: data.price,
                quantity: data.quantity,
                address: data.address,
                phnNum: data.phnNum
            }
            console.log(purchaseOrder);
            setError('');
        }
        else {
            if (order.minOrderQuantity > data.quantity) {
                setError('enter a min Quantity');
                toast('enter a min Quantity')
            }
            else {
                setError('reduce the  Quantity');
                toast('reduce the  Quantity')
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
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <input type='text'
                        className='input input-bordered w-full max-w-xs mx-auto'
                        {...register("name")}
                        value={user?.displayName}
                        readOnly
                    />
                    <input type='email'
                        className='input input-bordered w-full max-w-xs mx-auto'
                        {...register("email")}
                        value={user?.email}
                        readOnly
                    />

                    <input
                        className='input input-bordered w-full max-w-xs mx-auto'
                        {...register("orderName")}
                        value={order.name}
                        readOnly
                    />
                    <input
                        className='input input-bordered w-full max-w-xs mx-auto'
                        {...register("price")}
                        value={order.price}
                        readOnly
                    />
                    <div class="form-control w-full max-w-xs mx-auto">
                        <input
                            placeholder='Quantity'
                            className='input input-bordered w-full max-w-xs'
                            {...register("quantity")} required />
                        <label class="label">
                            <span class="label-text text-red-500">{error}</span>
                        </label>
                    </div>
                    <input
                        placeholder='address'
                        className='input input-bordered w-full max-w-xs mx-auto'
                        {...register("address")}
                        required
                    />
                    <input
                        placeholder='Phone Number'
                        className='input input-bordered w-full max-w-xs mx-auto'
                        {...register("phnNum")}
                        required
                    />

                    <input type="submit" value='Submit' class="mx-auto btn w-full max-w-xs" />

                </form>
            </div>
        </div>
    );
};

export default PurchasePage;