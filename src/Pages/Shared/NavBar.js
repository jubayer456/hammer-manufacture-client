import React from 'react';
import { useAuthState, } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../Hooks/useAdmin';
import useCartHook from '../../Hooks/useCartHook';
import CartIndicator from './CartIndicator';

const NavBar = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const logout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    }
    const menuItem = <>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        {/* <li><Link to="/about">About Us</Link></li> */}
        <li><Link to="/myportfolio">My Portfolio</Link></li>
        {
            user ? <>
                <li><Link to='/dashboard'>DashBoard</Link></li>
                {!admin && <li className='pr-3'>
                    <CartIndicator></CartIndicator>
                </li>}
                <li><button onClick={logout} className='btn btn-md text-base-100'>Logout <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg></button></li>

            </> :
                <li><Link to="/login">Login<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg></Link></li>
        }


    </>

    return (
        <div className="navbar bg-red-200 font-semibold">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItem}
                    </ul>
                </div>
                <Link to='/' className='text-2xl'>Hammer Manufacture Ltd</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItem}
                </ul>
            </div>
            {
                user && <div className='navbar-end'>
                    <label htmlFor="DashboardModal" className="btn btn-primary drawer-button lg:hidden">

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                </div>
            }

        </div>
    );
};

export default NavBar;