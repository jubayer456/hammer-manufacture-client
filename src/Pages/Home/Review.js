import React from 'react';

const Review = ({ review }) => {
    const { name, image, rating, comment } = review;
    return (
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <div className='flex'>
                    <div class="avatar">
                        <div class=" w-12 h-12 rounded-full ring ring-primary  ring-offset-4 ">
                            <img src={image} alt="" />
                        </div>
                    </div>
                    <div className='pl-5'>
                        <h3 className='text-xl '>{name}</h3>
                        <h3>{rating}</h3>
                    </div>
                </div>
                <p>{comment}</p>
            </div>
        </div>
    );
};

export default Review;