import React from 'react';

const ProductRow = ({ order, index, setDeleteModal }) => {
    const { name, price, minOrderQuantity, availableQuantity, image } = order;
    return (
        <tr>
            <th>{index}</th>
            <td><div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                    <img src={image} alt="Avatar Tailwind CSS Component" />
                </div>
            </div></td>
            <td>{name}</td>
            <td>{price}</td>
            <td>{minOrderQuantity}</td>
            <td>{availableQuantity}</td>
            <td>
                <label onClick={() => setDeleteModal(order)} htmlFor="deleteProduct" className="btn btn-sm btn-error text-base-100">Delete</label>
            </td>
        </tr>
    );
};

export default ProductRow;