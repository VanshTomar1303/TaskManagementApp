import React, { useEffect, useState } from 'react'
import UserService from '../common/UserService';
import adminPng from '../assets/images/admin.png';

export default function AdminProfile() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchAdminData();
    }, []);


    async function fetchAdminData() {
        try {
            const token = localStorage.getItem('token'); // Replace with your actual token
            const adminProfile = await UserService.getAdminProfile(token);
            console.log()
            setProfileInfo(adminProfile)
        } catch (error) {
            console.error("Error fetching admin profile:", error);
        }
    }


    // Check if profileInfo and programmingLanguage are defined and if programmingLanguage is an array
    const programmingLanguages = profileInfo.programmingLanguage && Array.isArray(profileInfo.programmingLanguage)
        ? profileInfo.programmingLanguage.join(', ')
        : '';

    return (
        <div className='w-full h-[87vh] flex items-center justify-center'>
            <div className='h-[50vh] w-[60vw] border border-slate-700 rounded flex items-center justify-center'>
                <div className='Profile-pic h-[50vh] w-[20vw]  flex items-center justify-center'>
                    <img className='border rounded-full bg-slate-600 h-[30vh] w-[15vw]' src={adminPng} alt="admin png" />
                </div>
                <div className='desc h-[50vh] w-[40vw]  text-white flex gap-5 justify-center text-2xl flex-col'>
                    <p className='ml-3 text-slate-600'>
                        Username :
                        <span className='text-blue-400 ml-4'>
                            {profileInfo.username}
                        </span>
                    </p>
                    <p className='ml-3 text-slate-600'>
                        Email :  
                        <span className='text-blue-400 ml-4'>
                            {profileInfo.email}
                        </span>
                        </p>
                    <p className='ml-3 text-slate-600'>
                        Role : 
                        <span className='text-blue-400 ml-4'>
                            {profileInfo.role}
                        </span>
                        </p>
                    <p className='ml-3 text-slate-600'>
                        Bio :
                        <span className='text-blue-400 ml-4'>
                            {profileInfo.desc}
                        </span> 
                        </p>
                    <p className='ml-3 text-slate-600'>Programming Languages : </p>
                    <p className='ml-4 text-blue-400'>{programmingLanguages}</p>
                </div>
            </div>
        </div>
    )
}
