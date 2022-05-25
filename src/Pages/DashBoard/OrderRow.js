import React from 'react';
import { toast } from 'react-toastify';

const OrderRow = ({ order, index, refetch }) => {
    const { email, toolsName, price, quantity, address, phnNum, _id } = order;
    const deleteOrder = id => {
        fetch(`http://localhost:5000/booking/${id}`, {
            method: 'DELETE',
            headers: {
                'contenet-type': 'applicatioon/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${toolsName} succesfully cancell`)
                }
            })
    }
    return (
        <tr>
            <th>{index}</th>
            <td>{email}</td>
            <td>{toolsName}</td>
            <td>{quantity}</td>
            <td>{price}</td>
            <td>{phnNum}</td>
            <td>{address}</td>
            <td><button onClick={() => deleteOrder(_id)} className='btn btn-sm btn-error text-base-100'>Cancel</button></td>
        </tr>
    );
};

export default OrderRow;