import React from 'react';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const AddProduct = {
            name: event.target.name.value,
            price: event.target.price.value,
            minOrderQuantity: event.target.minOrderQuantity.value,
            availableQuantity: event.target.availableQuantity.value,
            description: event.target.description.value,
            image: event.target.image.value
        }
        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(AddProduct)
        })
            .then(res => res.json())
            .then(book => {
                toast.success('Successfully purchase order');
            })
    };

    return (
        <div>
            <h1 className='text-2xl'>Add product</h1>
            <form onSubmit={handleSubmit} >
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Product Name</span>
                    </label>
                    <input type='text'
                        name='name'
                        className='input input-bordered w-full max-w-xs'
                        required
                    />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Product price</span>
                    </label>
                    <input type='text' name='price'
                        className='input input-bordered w-full max-w-xs '
                        required
                    />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Minimum order Quantity</span>
                    </label>
                    <input
                        type='text'
                        name='minOrderQuantity'
                        className='input input-bordered w-full max-w-xs'
                        required
                    />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Available Quantity</span>
                    </label>
                    <input
                        type='text'
                        name='availableQuantity'
                        className='input input-bordered w-full max-w-xs '
                        required
                    />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Add product Picture</span>
                    </label>
                    <input
                        type='file'
                        name='image'
                        className='input input-bordered w-full max-w-xs'
                        required
                    />
                </div>
                <div class="form-control w-full max-w-xs ">
                    <label class="label">
                        <span class="label-text">Product Description</span>
                    </label>
                    <textarea name='description' class="textarea textarea-bordered" placeholder="Review" required></textarea>
                </div>

                <input type="submit" value='Add Product' class=" btn w-full max-w-xs my-3" />

            </form>
        </div>
    );
};

export default AddProduct;