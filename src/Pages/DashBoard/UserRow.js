import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';


const UserRow = ({ user, index, setRemoveUserModal, refetch }) => {
    const { email, role } = user;
    const navigate = useNavigate();
    const makeAdmin = email => {
        const updateRole = { role: 'admin' }
        fetch(`https://agile-chamber-23774.herokuapp.com/users/admin/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updateRole)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    toast.error(`${res.statusText} Access`);
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    navigate('/home');
                }
                return res.json();
            })
            .then(data => {
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
                {role !== 'admin' && <label onClick={() => setRemoveUserModal(user)} htmlFor="deleteUser" className="btn btn-sm btn-error text-base-100">Delete</label>}
            </td>
        </tr>
    );
};

export default UserRow;