import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Pages/Shared/Loading';

const useCartHook = (user) => {
    const { data: orders, isLoading, refetch } = useQuery('MyOrder1', () => fetch(`https://agile-chamber-23774.herokuapp.com/booking?email=${user.email}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }
    return { orders };
};

export default useCartHook;