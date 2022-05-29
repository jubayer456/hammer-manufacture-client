import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tool = ({ tool }) => {
    const { _id, name, image, description, minOrderQuantity, availableQuantity, price } = tool;
    const navigate = useNavigate();
    const handelOrder = id => {
        navigate(`/tools/${id}`);
    }
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="hammer" className="rounded-xl h-48" />
            </figure>
            <div className="card-body ">
                <h2 className="card-title text-xl">Name: {name}</h2>
                <h2 className="card-title text-lg">Price: {price}$</h2>
                <h2 className="card-title text-lg">Min order Quantity: {minOrderQuantity}</h2>
                <h2 className="card-title text-lg">Available order Quantity: {availableQuantity}</h2>
                <p><span className='font-bold'>Description: </span>{description}</p>
                <div className="card-actions">
                    <button onClick={() => handelOrder(_id)} className="btn btn-primary">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Tool;