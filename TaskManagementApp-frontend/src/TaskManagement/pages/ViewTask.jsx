import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import UserService from '../../common/UserService';
import pencil from '../../assets/images/icons8-pencil.gif'
import empty from '../../assets/images/icons8-empty-trash.gif'

export default function ViewTask() {
    const [task, setTask] = useState({});
    const [comment, setComment] = useState([]);
    const [email, setEmail] = useState("");
    const { taskName } = useParams();

    const [addComment, setAddComment] = useState({
        userEmail: "",
        taskName: taskName,
        comment: ""
    });


    const createAComment = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(addComment);
            const response = await UserService.addComment(token, addComment);
            setComment(prevComments => [...prevComments, response]); // Assuming response contains the new comment
            setAddComment({...addComment, comment: ""}); // Clear the comment input after submission
            console.log(response);
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    const onSubmitByUsers = (e) => {
        e.preventDefault();
        createAComment();
    };

    const loadTasksByTaskName = async (taskName) => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getTaskByTaskname(token, taskName);
            setTask(response);
        } catch (error) {
            console.error("Error fetching task:", error);
        }
    };

    const loadComment = async (taskName) => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getAllCommntForTasks(token, taskName);
            setComment(response);
            console.log(response);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    async function fetchUserEmail() {
        try {
            const token = localStorage.getItem('token');
            const userProfile = await UserService.getAdminAndUserProfile(token);
            setEmail(userProfile.email);
            setAddComment((prevAddComment) => ({
                ...prevAddComment,
                userEmail: userProfile.email
            }));
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }

    useEffect(() => {
        loadTasksByTaskName(taskName);
        loadComment(taskName);
        fetchUserEmail();
    }, [taskName]);

    const programmingLanguages = task.programmingLanguage && Array.isArray(task.programmingLanguage)
        ? task.programmingLanguage.join(', ')
        : '';

    return (
        <div className='w-full min-h-[50vh] max-h-[87vh] mt-2 ml-2 text-white overflow-hidden font-mono flex'>
            <div className='min-h-[60vh] max-h-full w-[40vw] border border-slate-700 rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col overflow-y-auto'>
                <h1 className='text-center text-2xl font-semibold p-4 bg-opacity-25 bg-gray-800 rounded-t-lg'>
                    Task Details
                </h1>
                <div className='p-4 space-y-4 flex-1 overflow-y-auto'>
                    <p className='text-[1.7rem]'>Name: <span className='text-[1.5rem] font-light'>{task.taskName}</span></p>
                    <p className='text-[1.6rem]'>Description: <span className='text-[1.3rem] font-light'>{task.taskDesc}</span></p>
                    <p className='text-[1.6rem]'>Time To Do: <span className='text-[1.3rem] font-light'>{task.timeToDoTask}</span></p>
                    <p className='text-[1.6rem]'>Programming Languages Used: <span className='text-[1.3rem] font-light'>{programmingLanguages}</span></p>
                    <p className='text-[1.6rem]'>Status: <span className='text-[1.3rem] font-light'>{task.status}</span></p>
                    <p className='text-[1.6rem]'>Worked By: <span className='text-[1.3rem] font-light'>{task.workedBy === "" ? "none" : task.workedBy}</span></p>
                </div>
            </div>
            <div className="border p-4 space-y-4 mr-5 ml-3 flex flex-col text-white flex-1 h-[87vh]">
                <div className="flex-1 overflow-scroll overflow-x-hidden">
                    {comment.length === 0 ? (
                        <p className="text-white text-center">No comment found</p>
                    ) : (
                        comment.map((comment, i) => (
                            <div className="border m-1 rounded h-[15vh]  border-slate-500 bg-slate-400" key={i}>
                                <div id="email" className="ml-2 mr-2 mt-2 h-5">
                                    <span className="p-2">{comment.userEmail}</span>
                                </div>
                                <div id="comment" className="ml-2 mr-2 mt-4 h-10">
                                    <span className="p-2 ">{comment.comment}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="mt-auto">
                    <form onSubmit={onSubmitByUsers}>
                        <label htmlFor="chat" className="sr-only">Your message</label>
                        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                    <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                                </svg>
                                <span className="sr-only">Upload image</span>
                            </button>
                            <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                                </svg>
                                <span className="sr-only">Add emoji</span>
                            </button>
                            <textarea
                                id="chat"
                                value={addComment.comment}
                                onChange={(e) => setAddComment({...addComment, comment: e.target.value})}
                                rows="1"
                                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Your message..."
                            ></textarea>
                            <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                                </svg>
                                <span className="sr-only">Send message</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
