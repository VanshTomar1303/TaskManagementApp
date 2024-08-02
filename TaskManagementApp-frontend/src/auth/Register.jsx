import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserService from '../common/UserService';

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
        desc:'',
        programmingLanguage:[]
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
        try {
            // Call the register method from UserService

            await UserService.register(formData);

            // Clear the form fields after successful registration
            setFormData({
                username: '',
                email: '',
                password: '',
                role: '',
                desc:'',
                programmingLanguage:[]
            });
            alert('User registered successfully');
            navigate('/verifyEmail');

        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
    };

    return (
        <div className='flex items-center justify-center flex-col w-full h-[87vh]'>
            {/* // ~ Registration form */}
            <form className=" border border-slate-700 w-[70vh] p-3 rounded mt-6 " onSubmit={handleSubmit}>
            <h1 className=' text-center mb-2 font-semibold text-purple-600 hover:text-purple-900'>Registration Form</h1>
                {/* // -> Email */}
                <div className="mb-3"> 
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                </div>
                {/* // ~ Username */}
                <div className="mb-3">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Vansh Tomar" required />
                </div>
                {/* // ~ Role Admin or User */}
                <div className="mb-3">
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                    <input type="text" id="role" name="role" value={formData.role} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ADMIN / USER" required />
                </div>
                {/* // | Password */}
                <div className="mb-3">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                {/* // -> Description */}
                <div className='mb-3'>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Description</label>
                    <textarea id="message" name="desc" value={formData.desc} onChange={handleInputChange} rows="2" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write here..."></textarea>
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

                {/* // -> Button */}
                <div className='flex items-center justify-center'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>
            {/* // ~ Link to login */}
            <div className='mt-4'>
                <Link to={"/login"}><span className='text-blue-500 underline hover:text-blue-800'>Already have an account?</span> <span className='text-white'>Login</span></Link>
            </div>

        </div>
    )
}
