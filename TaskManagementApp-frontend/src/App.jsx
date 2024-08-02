import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './NavBar/Navbar';
import Register from './auth/Register';
import Login from './auth/Login';
import VerifyEmail from './auth/VerifyEmail';
import ResendCode from './auth/ResendCode';
import AdminProfile from './UserManagement/AdminProfile';
import UserProfile from './UserManagement/UserProfile';
import Users from './UserManagement/UserData';

import './index.css'
import ViewUser from './UserManagement/UpdateViewForms/ViewUser';
import UpdateUser from './UserManagement/UpdateViewForms/UpdateUser';
import TaskManagement from './TaskManagement/TaskManagement';
import AddTask from './TaskManagement/pages/AddTask';
import ViewTask from './TaskManagement/pages/ViewTask';
import UpdateTask from './TaskManagement/pages/UpdateTask';

function App() {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = document.getElementById('element');
    
    const checkOverflow = () => {
      if (element) {
        const hasOverflow = element.scrollHeight > element.clientHeight;
        setIsOverflowing(hasOverflow);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <div
      id='element'
      className={`h-screen w-full ${isOverflowing ? 'bg-overflow' : 'bg-black'}`}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/verifyEmail" element={<VerifyEmail />} />
          <Route exact path="/resendCode" element={<ResendCode />} />
          <Route exact path="/profile" element={<AdminProfile />} />
          <Route exact path="/userProfile" element={<UserProfile />} />
          <Route exact path="/admin/user-Management" element={<Users />} />
          <Route exact path="/admin/viewUser/:email" element={<ViewUser />} />
          <Route exact path="/admin/updateUser/:email" element={<UpdateUser />} />
          <Route exact path="/admin/task-Management" element={<TaskManagement />} />        
          <Route exact path="/admin/addTask" element={<AddTask />} />        
          <Route exact path="/admin/viewTask/:taskName" element={<ViewTask />} />        
          <Route exact path="/admin/updateTask/:taskName" element={<UpdateTask />} />        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;