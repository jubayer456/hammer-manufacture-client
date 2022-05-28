import React from 'react';
import { Link } from 'react-router-dom';

const OrderRow = ({ order, index, setDeleteModal }) => {
    const { _id, email, toolsName, price, quantity, address, phnNum, paid } = order;
    return (
        <tr>
            <th>{index}</th>
            <td>{email}</td>
            <td>{toolsName}</td>
            <td>{quantity}</td>
            <td>{price}</td>
            <td>{phnNum}</td>
            <td>{address}</td>
            <td>{!paid && <><Link to={`/dashBoard/payment/${_id}`}><button className='btn btn-sm btn-blue-500 text-base-100 mx-1'>Pay</button></Link>
                <label onClick={() => setDeleteModal(order)} for="deleteOrder" className="btn btn-sm btn-error text-base-100 mx-1">Cencel</label>
            </>}
                {paid && <span className='btn btn-success btn-sm text-base-100'>Paid</span>}</td>

        </tr>
    );
};

export default OrderRow;