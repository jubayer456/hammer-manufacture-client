import React from 'react';

const OrderRow = ({ order, index, refetch }) => {
    const { email, toolsName, price, quantity, address, phnNum } = order;
    return (
        <tr>
            <th>{index}</th>
            <td>{email}</td>
            <td>{toolsName}</td>
            <td>{quantity}</td>
            <td>{price}</td>
            <td>{phnNum}</td>
            <td>{address}</td>
            <td><button className='btn btn-sm btn-error text-base-100'>Cancel</button></td>
        </tr>
    );
};

export default OrderRow;