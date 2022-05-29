import React, { useState } from 'react';

const ManageOrderRow = ({ order, index, setOrderModal }) => {
    const { price, toolsName, quantity, paid, userName } = order;
    const [status, setStatus] = useState('');
    const paidStatus = () => {
        setStatus('Shiped');
    }
    return (
        <tr>
            <th>{index}</th>
            <th>{userName}</th>
            <td>{toolsName}</td>
            <td>{price}</td>
            <td>{quantity}</td>
            <td>{!paid && <><button className='btn btn-sm btn-blue-500 text-base-100 mx-1'>Pending</button>
                <label onClick={() => setOrderModal(order)} htmlFor="deleteAdminOrder" className="btn btn-sm btn-error text-base-100 mx-1">Cencel</label>
            </>}
                {paid && <span onClick={paidStatus} className='btn btn-success btn-sm text-base-100'>{status ? 'Shipped' : 'paid'}</span>}</td>

        </tr>
    );
};

export default ManageOrderRow;