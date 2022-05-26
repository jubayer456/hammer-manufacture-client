import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const MyReviews = () => {
    const [user] = useAuthState(auth);
    const [error, setError] = useState([]);
    const submitReview = (event) => {
        event.preventDefault();
        const rating = event.target.rating.value;
        const addReview = {
            name: event.target.name.value,
            email: event.target.email.value,
            rating: rating,
            review: event.target.review.value
        }
        if (rating > 0 && rating <= 5) {
            fetch('http://localhost:5000/reviews', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(addReview)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    toast('Successfully give the review');
                })
        }
        else {
            setError('review must be 0 to 5');
            toast('review must be 0 to 5')
        }
    }
    return (
        <div className='mx-3 w-96'>
            <h1 className='text-2xl py-4'>Please give a review</h1>
            <form onSubmit={submitReview}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Your Name</span>
                    </label>
                    <input name='name' value={user.displayName} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Your Email</span>
                    </label>
                    <input name='email' value={user.email} type="email" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Please Give a ratings out of 5</span>
                    </label>
                    <input name='rating' type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                    <span className='text-red-500'>{error}</span>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Your Review</span>
                    </label>
                    <textarea name='review' className="textarea textarea-bordered" placeholder="Review" required></textarea>
                </div>
                <input type="submit" value="Submit" className='mx-auto btn w-full max-w-xs my-2' />
            </form>
        </div>

    );
};

export default MyReviews;