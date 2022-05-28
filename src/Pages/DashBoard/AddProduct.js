import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const AddProduct = () => {
    const { register, handleSubmit } = useForm();
    const imageStorage = '87daff5d6c83e393f1571b44cd608116';
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (data.minOrderQuantity <= data.availableQuantity) {
            const img = data.image[0];
            const formData = new FormData();
            formData.append('image', img);
            const url = `https://api.imgbb.com/1/upload?key=${imageStorage}`;
            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        const img = result.data.url;
                        const AddProduct = {
                            name: data.name,
                            price: data.price,
                            minOrderQuantity: data.minOrderQuantity,
                            availableQuantity: data.availableQuantity,
                            description: data.description,
                            image: img
                        }
                        fetch('http://localhost:5000/tools', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                authorization: `Bearer ${localStorage.getItem('accessToken')}`
                            },
                            body: JSON.stringify(AddProduct)
                        })
                            .then(res => {
                                if (res.status === 401 || res.status === 403) {
                                    toast.error(`${res.statusText} Access`);
                                    signOut(auth);
                                    localStorage.removeItem('accessToken');
                                    navigate('/home');
                                }
                                return res.json();
                            })
                            .then(book => {
                                if (book.insertedId) {
                                    toast.success('Successfully Add Product');
                                }
                                else {
                                    toast.error('Can not Add Product');
                                }
                                setError('');
                            })
                    };
                }
                )
        }
        else {
            setError('Min quantity must be higher than available Quantity');
            toast.error('Min quantity must be higher than available Quantity')
        }
    }
    return (
        <div className='p-12'>
            <h1 className='text-2xl'>Add product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input type='text'
                        name='name'
                        className='input input-bordered w-full max-w-xs'
                        {...register("name")}
                        required
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Product price</span>
                    </label>
                    <input type='text'
                        className='input input-bordered w-full max-w-xs '
                        {...register("price")}
                        required
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Minimum order Quantity</span>
                    </label>
                    <input
                        type='text'
                        className='input input-bordered w-full max-w-xs'
                        {...register("minOrderQuantity")}
                        required
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Available Quantity</span>
                    </label>
                    <input
                        type='text'
                        className='input input-bordered w-full max-w-xs '
                        {...register("availableQuantity")}
                        required
                    />
                    <span className='text-red-500'>{error}</span>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Add product Picture</span>
                    </label>
                    <input
                        type='file'
                        className='input input-bordered w-full max-w-xs'
                        {...register("image")}
                        required
                    />

                </div>
                <div className="form-control w-full max-w-xs ">
                    <label className="label">
                        <span className="label-text">Product Description</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered"
                        placeholder="Description"
                        {...register("description")}
                        required></textarea>

                </div>

                <input type="submit" value='Add Product' className=" btn w-full max-w-xs my-3" />

            </form>
        </div>
    );
};

export default AddProduct;