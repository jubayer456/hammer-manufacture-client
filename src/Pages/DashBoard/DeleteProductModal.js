import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const DeleteProductModal = ({ deleteModal, setDeleteModal, refetch }) => {
    const { _id, name } = deleteModal;
    const navigate = useNavigate();
    const deleteOrder = id => {
        fetch(`http://localhost:5000/tools/${id}`, {
            method: 'DELETE',
            headers: {
                'contenet-type': 'applicatioon/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    console.log(res);
                    toast.error(`${res.statusText} Access`);
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    navigate('/home');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    refetch();
                    setDeleteModal(false);
                    toast.success(`${name} succesfully Deleted`)
                }
                else {
                    setDeleteModal(false);
                    toast.err(`${name} did not Deleted`)
                }
            })
    }
    return (
        <div>

            <input type="checkbox" id="deleteProduct" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure You want to delete ${name}</h3>
                    <p className="py-4">If you click delete then You can not retrieve deleted item</p>
                    <div className="modal-action">
                        <button onClick={() => deleteOrder(_id)} className='btn btn-sm btn-error text-base-100'>Yes</button>
                        <label htmlFor="deleteProduct" className="btn btn-sm">No</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteProductModal;