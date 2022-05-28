import React from 'react';
import Avatar from 'react-avatar';
import img from '../../img/18942381.png'
import { useAuthState, } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const imageStorage = '87daff5d6c83e393f1571b44cd608116';
    const { data: users, isLoading, refetch } = useQuery('usersInProfile', () => fetch(`http://localhost:5000/users?email=${user.email}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }

    const updateProfile = (event) => {
        console.log(users);
        event.preventDefault();
        const updateProfileInf = {
            education: event.target.education.value,
            contact: event.target.contact.value,
            address: event.target.address.value,
            country: event.target.country.value,
            city: event.target.city.value
        }
        fetch(`http://localhost:5000/profile/${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updateProfileInf)
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                console.log(res);
                toast.error(`${res.statusText} Access`);
                signOut(auth);
                localStorage.removeItem('accessToken');
                navigate('/home');
            }
            return res.json();
        })
            .then(update => {
                if (update.acknowledged) {
                    refetch();
                    toast.success('Successfully updated Profile Information');
                }
                else {
                    toast.error('Can not  updated Profile Information');
                }

            })
    }
    const updateProfilePic = data => {
        const img = data.profilePic[0];
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorage}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const updateProfile = { image: img }
                    fetch(`http://localhost:5000/profile/${user.email}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(updateProfile)
                    }).then(res => {
                        if (res.status === 401 || res.status === 403) {
                            toast.error(`${res.statusText} Access`);
                            signOut(auth);
                            localStorage.removeItem('accessToken');
                            navigate('/home');
                        }
                        return res.json();
                    })
                        .then(update => {
                            if (update.acknowledged) {
                                refetch();
                                toast.success('Successfully updated Profile Picture');
                            }
                            else {
                                toast.error('Can not  updated Profile Picture');
                            }

                        })
                }
            })
    }

    return (
        <div className='p-12'>
            <h1 className='text-2xl py-4'>My Profile</h1>
            <div className='flex justify-between'>
                <form onSubmit={updateProfile}  >
                    <div className="form-control max-w-xs" >
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input onChange='' readOnly value={user.displayName} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input onChange='' readOnly value={user.email} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Education</span>
                        </label>
                        <input name='education' onChange='' defaultValue={users[0]?.education} type="text" placeholder="Education" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Contact Number</span>
                        </label>
                        <input name='contact' onChange='' defaultValue={users[0]?.contact} type="text" placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input onChange='' name='address' defaultValue={users[0]?.address} type="text" placeholder="Address" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className='flex gap-8'>
                        <div className="form-control w-36 max-w-xs ">
                            <label className="label">
                                <span className="label-text">Country</span>
                            </label>
                            <input onChange='' name='country' defaultValue={users[0]?.country} type="text" placeholder="Country" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-36 max-w-xs">
                            <label className="label">
                                <span className="label-text">City</span>
                            </label>
                            <input onChange='' name='city' defaultValue={users[0]?.city} type="text" placeholder="City" className="input input-bordered w-full max-w-xs" />
                        </div>
                    </div>
                    <input type="submit" value='update' className='btn my-5' />

                </form>
                <div>
                    {
                        users[0]?.image ? <><Avatar size="160" round={true} src={users[0]?.image || img} /></> :
                            <Avatar size="160" round={true} src={img} />
                    }

                    <form onSubmit={handleSubmit(updateProfilePic)}>
                        <div >
                            <span className="label-text">Change profile Picture</span><br />
                            <input type="file" name="" id=""
                                {...register('profilePic')}
                                required
                            />
                        </div>
                        <input type='submit' value='upload' className='btn my-5'></input>
                    </form>
                </div>
            </div>
        </div>
    );
};



export default MyProfile;