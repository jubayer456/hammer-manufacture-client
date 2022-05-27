import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const DeleteUserModal = ({ removeUserModal, setRemoveUserModal, refetch }) => {
    const { _id, email } = removeUserModal;
    const navigate = useNavigate();
    const deleteProduct = id => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
            headers: {
                'contenet-type': 'applicatioon/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
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
                if (data.deletedCount > 0) {
                    refetch();
                    setRemoveUserModal(null);
                    toast.success(`${email} succesfully Deleted`)
                }
            })
    }
    return (
        <div>

            <input type="checkbox" id="deleteUser" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure You want to delete ${email}</h3>
                    <p className="py-4">If you click delete then You can not retrieve deleted item</p>
                    <div className="modal-action">
                        <button onClick={() => deleteProduct(_id)} className='btn btn-sm btn-error text-base-100'>Yes</button>
                        <label htmlFor="deleteUser" className="btn btn-sm">No</label>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DeleteUserModal;