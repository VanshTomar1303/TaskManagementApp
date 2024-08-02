import React from 'react'
import UserService from '../common/UserService';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();
    const isUser = UserService.isUser();



    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
        }
    };
    return (


        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/login" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl hover:transition-all hover:text-3xl hover:text-pink-300 font-semibold whitespace-nowrap dark:text-white">Task Management App</span>
                </a>
                <div className=" w-full md:block md:w-auto" id="navbar-default">
                    <ul className='text-white flex items-center justify-center gap-6 text-[1.0rem]'>
                        {!isAuthenticated && <li><Link className='hover:underline hover:text-pink-600' to="/login">Login</Link></li>}
                        {!isAuthenticated && <li><Link className='hover:underline hover:text-pink-600' to="/register">Register</Link></li>}
                        {!isAuthenticated && <li><Link className='hover:underline hover:text-pink-600' to="/verifyEmail">Verify Email</Link></li>}
                        {isAdmin && isAuthenticated && <li><Link className='hover:underline hover:text-pink-600' to="/profile">Admin Profile</Link></li>}
                        {isUser && isAuthenticated && <li><Link className='hover:underline hover:text-pink-600' to="/userProfile">User Profile</Link></li>}
                        {isUser && isAuthenticated && <li><Link className='hover:underline hover:text-pink-600' to="/admin/task-Management">Tasks</Link></li>}
                        {isAdmin && <li><Link className='hover:underline hover:text-pink-600' to="/admin/user-Management">User Management</Link></li>}
                        {isAdmin && <li><Link className='hover:underline hover:text-pink-600' to="/admin/task-Management">Task Management</Link></li>}
                        {isAuthenticated && <li><Link className='hover:underline hover:text-pink-600' to="/login" onClick={handleLogout}>Logout</Link></li>}
                    </ul>
                </div>
            </div>
        </nav>

    )
}
