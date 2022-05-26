import React from 'react';
import { toast } from 'react-toastify';

const DeleteProductModal = ({ deleteModal, setDeleteModal, refetch }) => {
    const { _id, name } = deleteModal;
    const deleteOrder = id => {
        fetch(`http://localhost:5000/tools/${id}`, {
            method: 'DELETE',
            headers: {
                'contenet-type': 'applicatioon/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    refetch();
                    setDeleteModal(false);
                    toast.success(`${name} succesfully Deleted`)
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
                        <label for="deleteProduct" className="btn btn-sm">No</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteProductModal;