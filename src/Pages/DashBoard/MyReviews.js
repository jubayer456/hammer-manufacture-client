import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyReviews = () => {
    const [user] = useAuthState(auth);
    const submitReview = (event) => {

    }
    return (
        <div className='mx-3 w-96'>
            <h1 className='text-2xl py-4'>Please give a review</h1>
            <form onSubmit={submitReview}></form>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Your Name</span>
                </label>
                <input value={user.displayName} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" required />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Your Email</span>
                </label>
                <input value={user.email} type="email" placeholder="Type here" class="input input-bordered w-full max-w-xs" required />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Please Give a ratings out of 5</span>
                </label>
                <input type="number" placeholder="Type here" class="input input-bordered w-full max-w-xs" required />
                <label class="label">

                </label>
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">Your Review</span>
                </label>
                <textarea class="textarea textarea-bordered" placeholder="Review" required></textarea>
            </div>
            <input type="submit" value="Submit" className='mx-auto btn w-full max-w-xs my-2' />
        </div>
    );
};

export default MyReviews;