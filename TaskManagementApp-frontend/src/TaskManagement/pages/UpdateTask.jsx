import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../common/UserService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateTask() {
    
    const isAdmin = UserService.isAdmin();
    const isUser = UserService.isUser();
    const navigate = useNavigate();
    const { taskName } = useParams();
  
    const [taskData, setTaskData] = useState({
        taskName: '',
        taskDesc: '',
        timeToDoTask: '',
        status: "",
        workedBy: "",
        programmingLanguage: []
    });
  
    useEffect(() => {
      fetchUserDataByTaskName(taskName);
    }, [taskName]);
  
    const fetchUserDataByTaskName = async (taskName) => {
      try {
        const token = localStorage.getItem('token');
        const response = await UserService.getTaskByTaskname(token, taskName);
        
        // Ensure response has the expected structure
        if (response) {
          const { taskName: TaskName, taskDesc, timeToDoTask, status, workedBy, programmingLanguage = [] } = response;
          setTaskData({ taskName: TaskName, taskDesc, timeToDoTask, status, workedBy, programmingLanguage });
        } else {
          toast.error('No task data found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error fetching task data. Please try again.');
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setTaskData((prevTaskData) => ({
        ...prevTaskData,
        [name]: value
      }));
    };
  
    const onPLChange = (e) => {
      const value = e.target.value;
      setTaskData((prevState) => ({
        ...prevState,
        programmingLanguage: prevState.programmingLanguage.includes(value)
          ? prevState.programmingLanguage.filter((pl) => pl !== value)
          : [...prevState.programmingLanguage, value]
      }));
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const confirmUpdate = window.confirm('Are you sure you want to update this task?');
          if (!confirmUpdate) return;
      
          const token = localStorage.getItem('token');
          let response;
      
          if (isAdmin) {
            response = await UserService.updateTaskByAdmin(token, taskName, taskData);
          } else {
            response = await UserService.updateTaskByUser(token, taskName, taskData);
        }
     
      
          if (response && response.message) {
            toast.success(response.message || 'Task Updated successfully!');
          } else {
            toast.error(response.message || 'Task update failed.');
          }
      
          setTimeout(() => {
            navigate('/admin/task-Management');
        }, 6000);
      
        } catch (error) {
          console.error('Error updating task profile:', error);
          toast.error('Error Updating task. Please try again.');
          navigate('/admin/task-Management');
        }
      };
      
    return (
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg text-white">
        <h2 className="text-3xl font-semibold mb-6 text-center">Update Task Details</h2>
        <form onSubmit={handleSubmit}>
          {isAdmin && (
            <>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium mb-2">Name:</label>
                <input
                  type="text"
                  name="taskName"
                  value={taskData.taskName || ''}
                  onChange={handleInputChange}
                  className="w-full text-black p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium mb-2">Description:</label>
                <input
                  type="text"
                  name="taskDesc"
                  value={taskData.taskDesc || ''}
                  onChange={handleInputChange}
                  className="w-full text-black p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium mb-2">Time To Do:</label>
                <input
                  type="text"
                  name="timeToDoTask"
                  value={taskData.timeToDoTask || ''}
                  onChange={handleInputChange}
                  className="w-full text-black p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </>
          )}

          <div className="form-group mb-4">
            <label className="block text-sm font-medium mb-2">Status:</label>
            <input
              type="text"
              name="status"
              value={taskData.status || ''}
              onChange={handleInputChange}
              className="w-full text-black p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="form-group mb-4">
            <label className="block text-sm font-medium mb-2">Worked By:</label>
            <input
              type="text"
              name="workedBy"
              value={taskData.workedBy || ''}
              onChange={handleInputChange}
              className="w-full text-black p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          
          {isAdmin && (
            <div className="form-group mb-4">
              <label className="block text-sm font-medium mb-2">Programming Languages:</label>
              <div className="flex flex-wrap gap-3">
                {['JavaScript', 'Python', 'Spring and Spring Boot', 'Java', 'C++', 'Ruby', 'Reactjs', 'Angular'].map((language) => (
                  <label key={language} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={language}
                      checked={taskData.programmingLanguage.includes(language)}
                      onChange={onPLChange}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span>{language}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Update
          </button>
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
