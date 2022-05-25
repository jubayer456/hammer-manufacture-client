import React from 'react';
import { toast } from 'react-toastify';

const DeleteOrderModal = ({ deleteModal, setDeleteModal, refetch }) => {
    const { _id, toolsName } = deleteModal;
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
                    setDeleteModal(false);
                    toast.success(`${toolsName} succesfully cancell`)
                }
            })
    }
    return (
        <div>

            <input type="checkbox" id="deleteOrder" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Are you sure You want to delete ${toolsName}</h3>
                    <p class="py-4">If you click delete then You can not retrieve deleted item</p>
                    <div class="modal-action">
                        <button onClick={() => deleteOrder(_id)} className='btn btn-sm btn-error text-base-100'>Yes</button>
                        <label for="deleteOrder" class="btn btn-sm">No</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteOrderModal;