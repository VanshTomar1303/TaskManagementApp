import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserService from '../common/UserService';

export default function VerifyEmail() {

    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        email:"",
        verificationCode:""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the register method from UserService

            await UserService.verify(formData);

            // Clear the form fields after successful registration
            setFormData({
                email: '',
                verificationCode:''
            });
            alert('User verified successfully');
            navigate('/login');

        } catch (error) {
            console.error('Error verifying user:', error);
            alert('An error occurred while verifying user');
        }
    };


  return (
    <div className='flex items-center justify-center flex-col w-full h-[87vh]'>
            {/* // ~ Verify Email form */}
            <form className="max-w-sm mx-auto border border-slate-700 w-[80%] p-5 rounded" onSubmit={handleSubmit}>
            <h1 className=' text-center mb-4 font-semibold text-purple-600 hover:text-purple-900'>Verify Email Form</h1>
                {/* // -> Email */}
                <div className="mb-5"> 
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                </div>
               {/* // | verfication code */}
                <div className="mb-5">
                    <label htmlFor="verficationCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Verification Code</label>
                    <input type="text" id="verficationCode" name="verificationCode" value={formData.verificationCode} onChange={handleInputChange}   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                {/* // ~ Button */}
                <div className='flex items-center justify-center'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Verify</button>
                </div>
            </form>
            {/* // ~ link to register */}
            <div className='mt-4'>
                <Link to={"/login"}><span className='text-blue-500 underline hover:text-blue-800'>If account is verified?</span> <span className='text-white'>Login</span></Link>
            </div>
            {/* resend code */}
            <div className='mt-4'>
                <Link to={"/resendCode"}><span className='text-blue-500 underline hover:text-blue-800'>Resend Code</span> </Link>
            </div>
    </div>
  )
}
