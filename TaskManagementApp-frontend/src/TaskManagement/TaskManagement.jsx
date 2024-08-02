import React, { useEffect, useState } from 'react'
import UserService from '../common/UserService';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eye from '../assets/images/icons8-eye.gif'
import pencil from '../assets/images/icons8-pencil.gif'
import empty from '../assets/images/icons8-empty-trash.gif'

export default function TaskManagement() {
    const isAdmin = UserService.isAdmin();

    const [task, setTask] = useState([]);
    const navigate = useNavigate()
    const [searchKeyword, setSearchKeyword] = useState('');

    const loadUsers = async () => {
        const token = localStorage.getItem('token');
        const result = await UserService.getAllTask(token);
        setTask(result);
        console.log(result) 
    }
    
    const loadUsersByPL = async (keyword) => {
        const token = localStorage.getItem('token');
        try {
            const result = await UserService.getTaskByPl(token, keyword);
            setTask(result);// Update state with search results
        } catch (error) {
            console.error('Error fetching users by programming language:', error);
        }
    }
    
    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
        console.log(searchKeyword);
        loadUsersByPL(searchKeyword);
    }

    // Optionally, you could call loadUsers when the component mounts if needed
    useEffect(() => {
        loadUsers();
    }, []);

    const delTask=async (taskName) =>{
        const token = localStorage.getItem('token')
        
        try {
         const data=   await axios.delete(`http://localhost:8080/admin/deleteTask/${encodeURIComponent(taskName)}`,{
                headers: {Authorization: `Bearer ${token}`}
            });

            const response = data.data;

            if (response && response.message) { 
                toast.success(response.message || 'Task added successfully!');
                setTimeout(() => {
                    navigate('/admin/task-Management');
                }, 6000);
            } else {
                toast.error(response.message);
                setTimeout(() => {
                    navigate('/admin/task-Management');
                }, 6000)
            }
        } catch (error) {
            console.error('Error Deleting task:', error);
            toast.error('Error Deleting task. Please try again.');
            setTimeout(() => {
                navigate('/admin/task-Management');
            }, 6000)
        }
    }


    return (
        <div className="container h-[87vh] w-full flex justify-center items-center flex-col bg-black overflow-x-hidden">
            <div className='searchBar h-[20vh] w-[50%] mt-16'>
                <form className="max-w-md mx-auto" onSubmit={handleSearch}>
                    <label htmlFor="input" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white" >Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 w-[50vw] flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)} type="search"  id="input" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Task By Proogramming Language......" required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                    {isAdmin && <div className='absolute top-[18.5vh] right-[20vw]'>
                        <Link to={'/admin/addTask'}><button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ADD TASK</button></Link>
                    </div>}
                </form>
            </div>
            <div className='users mt-16 h-[60vh] w-full flex justify-center items-center flex-wrap '>
            {
                    task.length === 0 ? (
                        <p className="text-white">No users found</p> // Message if no users are found
                    ) : (
                        task.map((task, index) => (
                            <div className='w-[25vw] p-2 ml-5' key={index+1}>
                                <div className='card bg-slate-600 text-slate-500 border-2 h-[25vh] border-purple-400 hover:border-purple-300 rounded shadow-2xl'>
                                    <div className=' font-semibold space-y-4'>
                                        <p className='ml-2 text-[1rem] text-pink-700'>TaskName : <span className='ml-3 text-[1rem] text-pink-400'>{task.taskName}</span></p>
                                        <p className='ml-2 text-[1rem] text-pink-700'>Status : <span className='ml-3 text-[1rem] text-pink-400'>{task.status}</span></p>
                                        <p className='ml-2 text-[1rem] text-pink-700'>Time : <span className='ml-3 text-[1rem] text-pink-400'>{task.timeToDoTask}</span></p>
                                    </div>
                                    <div className='button flex mix-blend-color-burn gap-2 justify-around mt-10'>
                                        <Link to={`/admin/viewTask/${task.taskName}`}><img className='w-[20px] h-[15px]' src={eye} alt="View"/></Link>
                                        <Link to={`/admin/updateTask/${task.taskName}`}><img className='w-[20px] h-[15px]' src={pencil} alt="Edit" /></Link>
                                        {isAdmin && <button onClick={()=>delTask(task.taskName)}><img className='w-[20px] h-[15px]' src={empty} alt="Delete" /></button>}
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </div>
    );

}
