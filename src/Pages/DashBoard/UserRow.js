import React from 'react';
import { toast } from 'react-toastify';


const UserRow = ({ user, index, setRemoveUserModal, refetch }) => {
    const { email, role } = user;

    const makeAdmin = email => {
        const updateRole = { role: 'admin' }
        fetch(`http://localhost:5000/users/admin/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updateRole)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    toast.error('Failed to make an admin');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success('Successfully made and admin');
                }
                else {
                    toast.error('Can not made and admin');
                }
            });
    }

    return (
        <tr>
            <th>{index}</th>
            <td>{email}</td>
            <td> {role !== 'admin' && <label onClick={() => makeAdmin(email)} className="btn btn-sm  text-base-100">Admin</label>}</td>
            <td>
                <label onClick={() => setRemoveUserModal(user)} htmlFor="deleteUser" className="btn btn-sm btn-error text-base-100">Delete</label>
            </td>
        </tr>
    );
};

export default UserRow;