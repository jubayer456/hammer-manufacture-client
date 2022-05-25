import React from 'react';
import StarIcon from './StarIcon';
const Review = ({ rev }) => {
    const { name, image, rating, review } = rev;
    return (
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <div className='flex'>
                    <div class="avatar flex items-center">
                        <div class=" w-12 h-12 rounded-full ring ring-primary  ring-offset-4 ">
                            <img src={image} alt="" />
                        </div>
                    </div>
                    <div className='pl-5'>
                        <h3 className='text-xl '>{name}</h3>
                        <div class="rating pt-1">
                            <StarIcon
                                rating={parseInt(rating)}
                            ></StarIcon>
                        </div>
                    </div>
                </div>
                <p>{review}</p>
            </div>
        </div>
    );
};

export default Review;