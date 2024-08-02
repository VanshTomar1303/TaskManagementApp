import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../common/UserService';

export default function UpdateUser() {
  const navigate = useNavigate();
  const { email } = useParams();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    role: '',
    desc: '',
    programmingLanguage: []
  });

  useEffect(() => {
    fetchUserDataByEmail(email);
  }, [email]);

  const fetchUserDataByEmail = async (email) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getUserByEmail(token,email);
      const { username,email: userEmail, role, desc, programmingLanguage = [] } = response;
      setUserData({ username, email : userEmail, role, desc, programmingLanguage });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
};

  const onPLChange = (e) => {
    const value = e.target.value;
    setUserData((prevState) => ({
      ...prevState,
      programmingLanguage: prevState.programmingLanguage.includes(value)
        ? prevState.programmingLanguage.filter((pl) => pl !== value)
        : [...prevState.programmingLanguage, value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm('Are you sure you want to update this user?');
      if (confirmUpdate) {
        const token = localStorage.getItem('token');
        const response =await UserService.updateUser(email, userData, token);
        console.log(response)
        console.log(userData)
        navigate("/admin/user-management");
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      alert('Failed to update user profile.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">Update User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="block text-sm font-medium mb-2">Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username || ''}
            onChange={handleInputChange}
            className="w-full text-black p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-sm font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email || ''}
            onChange={handleInputChange}
            className="w-full text-black p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-sm font-medium mb-2">Role:</label>
          <input
            type="text"
            name="role"
            value={userData.role || ''}
            onChange={handleInputChange}
            className="w-full text-black p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-sm font-medium mb-2">Bio:</label>
          <input
            type="text"
            name="desc"
            value={userData.desc || ''}
            onChange={handleInputChange}
            className="w-full text-black p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-sm font-medium mb-2">Programming Languages:</label>
          <div className="flex flex-wrap gap-3">
            {['JavaScript', 'Python', 'Spring and Spring Boot', 'Java', 'C++', 'Ruby', 'Reactjs', 'Angular'].map((language) => (
              <label key={language} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={language}
                  checked={userData.programmingLanguage.includes(language)}
                  onChange={onPLChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>{language}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
}
