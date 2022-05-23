import React from 'react';

const Tool = ({ tool }) => {
    const { name, image, description, minOrderQuantity, availableQuantity, price } = tool;
    return (
        <div class="card w-96 bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
                <img src={image} alt="hammer" class="rounded-xl h-48" />
            </figure>
            <div class="card-body ">

                <h2 class="card-title text-xl">Name: {name}</h2>
                <h2 class="card-title text-lg">Price: {price}$</h2>
                <h2 class="card-title text-lg">Min order Quantity: {minOrderQuantity}</h2>
                <h2 class="card-title text-lg">Available order Quantity: {availableQuantity}</h2>

                <p><span className='font-bold'>Description: </span>{description}</p>
                <div class="card-actions">
                    <button class="btn btn-primary">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Tool;