import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../Hooks/useAdmin';

const DashBoard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div className="drawer drawer-mobile">
            <input id="DashboardModal" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content px-8">
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="DashboardModal" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">

                    <li><Link to='/dashboard'>My Profile</Link></li>
                    {
                        !admin && <> <li><Link to='myorders'>My Order</Link></li>
                            <li><Link to='myreview'>Add Review</Link></li></>
                    }
                    {
                        admin &&
                        <>
                            <li><Link to='allproduct'>Manage Products</Link></li>
                            <li><Link to='addproduct'>Add Product</Link></li>
                            <li><Link to='manageuser'>Manage Users</Link></li>
                            <li><Link to='manageallorder'>Manage All Order</Link></li>
                        </>
                    }
                </ul>

            </div>
        </div>
    );
};

export default DashBoard;