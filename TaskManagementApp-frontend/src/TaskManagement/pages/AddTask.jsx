import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from '../../common/UserService';

export default function AddTask() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        taskName: '',
        taskDesc: '',
        timeToDoTask: '',
        programmingLanguage: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onPLChange = (e) => {
        const value = e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            programmingLanguage: prevState.programmingLanguage.includes(value)
                ? prevState.programmingLanguage.filter((pl) => pl !== value)
                : [...prevState.programmingLanguage, value]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await UserService.addTask(token, formData);
            if (response && response.message) {
                setFormData({
                    taskName: '',
                    taskDesc: '',
                    timeToDoTask: '',
                    programmingLanguage: []
                });
                
                toast.success(response.message || 'Task added successfully!');
                setTimeout(() => {
                    navigate('/admin/task-management');
                }, 6000);
            } else {
                toast.error(response.message);
                setTimeout(() => {
                    navigate('/admin/task-management');
                }, 6000)
            }
        } catch (error) {
            console.error('Error adding task:', error);
            toast.error('Error adding task. Please try again.');
            setTimeout(() => {
                navigate('/admin/task-management');
            }, 6000)
        }
    };

    return (
        <div className='flex items-center justify-center flex-col w-full h-[87vh]'>
            <form className="border border-slate-700 w-[70vh] p-3 rounded mt-6" onSubmit={handleSubmit}>
                <h1 className='text-center mb-2 font-semibold text-purple-600 hover:text-purple-900'>ADD TASK FORM</h1>
                <div className="mb-3">
                    <label htmlFor="taskName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Name</label>
                    <input type="text" id="taskName" name="taskName" value={formData.taskName} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Task Name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="taskDesc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Description</label>
                    <input type="text" id="taskDesc" name="taskDesc" value={formData.taskDesc} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="About the task" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="timeToDoTask" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                    <input type="text" id="timeToDoTask" name="timeToDoTask" value={formData.timeToDoTask} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="DAYS/WEEK" required />
                </div>
                <label className='form-label text-white mb-1'>Programming Language</label>
                <div className='PL text-white flex flex-wrap gap-3 border border-slate-600 bg-gray-700 rounded p-1 mb-1'>
                    <div>
                        <label>
                            <input
                                type='checkbox'
                                value='JavaScript'
                                checked={formData.programmingLanguage.includes('JavaScript')}
                                onChange={onPLChange}
                            />
                            JavaScript
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='checkbox'
                                value='Python'
                                checked={formData.programmingLanguage.includes('Python')}
                                onChange={onPLChange}
                            />
                            Python
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='checkbox'
                                value='Spring and Spring Boot'
                                checked={formData.programmingLanguage.includes('Spring and Spring Boot')}
                                onChange={onPLChange}
                            />
                            Spring And SpringBoot
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='checkbox'
                                value='Java'
                                checked={formData.programmingLanguage.includes('Java')}
                                onChange={onPLChange}
                            />
                            Java
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='checkbox'
                                value='C++'
                                checked={formData.programmingLanguage.includes('C++')}
                                onChange={onPLChange}
                            />
                            C++
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='checkbox'
                                value='Ruby'
                                checked={formData.programmingLanguage.includes('Ruby')}
                                onChange={onPLChange}
                            />
                            Ruby
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='checkbox'
                                value='Reactjs'
                                checked={formData.programmingLanguage.includes('Reactjs')}
                                onChange={onPLChange}
                            />
                            Reactjs
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='checkbox'
                                value='Angular'
                                checked={formData.programmingLanguage.includes('Angular')}
                                onChange={onPLChange}
                            />
                            Angular
                        </label>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>
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
