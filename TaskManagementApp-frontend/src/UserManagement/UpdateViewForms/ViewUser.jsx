import React, { useEffect, useState } from 'react'
import UserService from '../../common/UserService';
import { useParams } from 'react-router-dom';

export default function ViewUser() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchUsersData();
    }, []);

    const { email } = useParams();


    async function fetchUsersData() {
        try {
            const token = localStorage.getItem('token'); // Replace with your actual token
            const userProfile = await UserService.getUserByEmail(token,email);
            setProfileInfo(userProfile)
        } catch (error) {
            console.error("Error fetching admin profile:", error);
        }
    }
        const programmingLanguages = profileInfo.programmingLanguage && Array.isArray(profileInfo.programmingLanguage)
        ? profileInfo.programmingLanguage.join(', ')
        : '';

    return (
        <div className='w-full h-[87vh] flex items-center justify-center'>
            <div className='h-[50vh] w-[60vw] border border-slate-700 rounded flex items-center justify-center'>
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
