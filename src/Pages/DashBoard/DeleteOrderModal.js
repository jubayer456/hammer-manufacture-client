import React from 'react';
import { toast } from 'react-toastify';

const DeleteOrderModal = ({ deleteModal, setDeleteModal, refetch }) => {
    const { _id, toolsName, quantity } = deleteModal;
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
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(updateTools)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
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