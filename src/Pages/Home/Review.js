import React from 'react';
import StarIcon from './StarIcon';
const Review = ({ rev }) => {
    const { name, image, rating, review } = rev;
    return (
        <div class="carousel-item">
            <div className="card bg-base-100 border hover:border-2">
                <div className="card-body w-96 bg-base-100 font-medium ">
                    <div className='flex'>
                        <div className="avatar flex items-center">
                            <div className=" w-12 h-12 rounded-full ring ring-primary  ring-offset-4 ">
                                <img src={image} alt="" />
                            </div>
                        </div>
                        <div className='pl-5'>
                            <h3 className='text-xl '>{name}</h3>
                            <div className="rating pt-1">
                                <StarIcon
                                    rating={parseInt(rating)}
                                ></StarIcon>
                            </div>
                        </div>
                    </div>
                    <p>{review}</p>
                </div>
            </div>
        </div>
    );
};

export default Review;