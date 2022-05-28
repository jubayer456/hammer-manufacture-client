import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import Review from './Review';

const Reviews = () => {
    const { data: reviews, isLoading } = useQuery('review', () => fetch('https://agile-chamber-23774.herokuapp.com/reviews')
        .then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='p-12'>
            <h2 className='text-center text-3xl font-bold pb-5'>What our customer Says</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                {
                    reviews.map(rev => <Review
                        key={rev._id}
                        rev={rev}>
                    </Review>)
                }
            </div>
        </div>
    );
};

export default Reviews;