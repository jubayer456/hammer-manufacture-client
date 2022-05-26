import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashBoard = () => {
    return (
        <div class="drawer drawer-mobile">
            <input id="DashboardModal" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content ">
                <h1 className='text-3xl '>Welcome to dashboard</h1>
                <Outlet />
            </div>
            <div class="drawer-side">
                <label for="DashboardModal" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">

                    <li><Link to='dashboard'>My Profile</Link></li>
                    <li><Link to='myorders'>My Order</Link></li>
                    <li><Link to='myreview'>Add Review</Link></li>
                    <li><Link to='allproduct'>Manage All Products</Link></li>
                    <li><Link to='addproduct'>Add Product</Link></li>
                    <li><Link to='manageuser'>Manage Users</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default DashBoard;