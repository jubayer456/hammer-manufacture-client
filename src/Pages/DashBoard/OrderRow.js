import React from 'react';

const OrderRow = ({ order, index, refetch, setDeleteModal }) => {
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
            <td>
                <label onClick={() => setDeleteModal(order)} for="deleteOrder" class="btn btn-sm btn-error text-base-100">Cencel</label>
            </td>
        </tr>
    );
};

export default OrderRow;