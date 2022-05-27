import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import DeleteUserModal from './DeleteUserModal';
import UserRow from './UserRow';

const ManageUser = () => {
    const [removeUserModal, setRemoveUserModal] = useState(null);
    const navigate = useNavigate();
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch(`http://localhost:5000/users`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            toast.error(`${res.statusText} Access`);
            signOut(auth);
            localStorage.removeItem('accessToken');
            navigate('/home');
        }
        return res.json();
    }));
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h1 className='text-2xl'>Manage user</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>email</th>
                            <th>Job</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <UserRow
                                key={user._id}
                                index={index + 1}
                                user={user}
                                refetch={refetch}
                                setRemoveUserModal={setRemoveUserModal}
                            ></UserRow>)
                        }

                    </tbody>
                </table>
            </div>


            {
                removeUserModal && <DeleteUserModal
                    setRemoveUserModal={setRemoveUserModal}
                    removeUserModal={removeUserModal}
                    refetch={refetch}
                >
                </DeleteUserModal>
            }
        </div>
    );
};

export default ManageUser;