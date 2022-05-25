import React from 'react';
import Avatar from 'react-avatar';
import img from '../../img/18942381.png'
import { useAuthState, } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyProfile = () => {
    const [user] = useAuthState(auth);



    const updateProfile = (event) => {

    }
    const updateProfilePic = (event) => {

    }

    return (
        <div className='p-12'>
            <h1 className='text-2xl py-4'>My Profile</h1>
            <div className='flex justify-between'>
                <form onSubmit={updateProfile}  >
                    <div class="form-control max-w-xs" >
                        <label class="label">
                            <span class="label-text">Name</span>
                        </label>
                        <input value={user.displayName} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input value={user.email} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Contact Number</span>
                        </label>
                        <input value={user.email} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Address</span>
                        </label>
                        <input value={user.email} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className='flex gap-8'>
                        <div class="form-control w-36 max-w-xs ">
                            <label class="label">
                                <span class="label-text">Country</span>
                            </label>
                            <input value={user.email} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                        </div>
                        <div class="form-control w-36 max-w-xs">
                            <label class="label">
                                <span class="label-text">City</span>
                            </label>
                            <input defaultValue={user.email} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                        </div>
                    </div>
                    <input type="submit" value='update' className='btn my-5' />

                </form>
                <form onSubmit={updateProfilePic} className=''>
                    <Avatar size="160" round={true} src={img} />
                    <div >
                        <input type="file" name="" id="" />
                    </div>
                </form>
            </div>
        </div>
    );
};



export default MyProfile;