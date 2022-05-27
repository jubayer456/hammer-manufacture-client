import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const DeleteOrderModal = ({ deleteModal, setDeleteModal, refetch }) => {
    const { _id, toolsName, quantity } = deleteModal;
    const navigate = useNavigate();
    const deleteOrder = id => {
        fetch(`http://localhost:5000/booking/${id}`, {
            method: 'DELETE',
            headers: {
                'contenet-type': 'applicatioon/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success.deletedCount > 0) {
                    const available = parseInt(data.update.availableQuantity) + parseInt(quantity);
                    const toolsId = data.update._id;
                    const updateTools = { available };
                    fetch(`http://localhost:5000/tools/${toolsId}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(updateTools)
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
                            refetch();
                            setDeleteModal(null);
                            toast.success(`${toolsName} succesfully cancell`)
                        })

                }
            })


    }

    return (
        <div>

            <input type="checkbox" id="deleteOrder" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure You want to delete ${toolsName}</h3>
                    <p className="py-4">If you click delete then You can not retrieve deleted item</p>
                    <div className="modal-action">
                        <button onClick={() => deleteOrder(_id)} className='btn btn-sm btn-error text-base-100'>Yes</button>
                        <label for="deleteOrder" className="btn btn-sm">No</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteOrderModal;