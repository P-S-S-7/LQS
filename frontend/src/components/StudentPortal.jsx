import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logout from './Logout';
import { REACT_APP_API_URI } from '../constants.js';

const StudentPortal = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URI}/users/user-details`, {
        withCredentials: true, // httpOnly cookies are sent automatically with axios requests
      });
      setEmail(response.data.data);
      console.log('Response Data:', response.data);
    } catch (error) {
      console.error('Error fetching email:', error);
    }
};

    fetchEmail();
  }, []);

  return (
    <div className="flex flex-col h-[90vh] w-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6 mx-3 my-7 mb-7 rounded-md">
      <div className="relative mb-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          Student Portal
        </h1>
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <Logout />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-300 mb-4">
        <p className="text-center text-gray-800">Email: {email}</p>
      </div>
      <div className="flex-grow flex">
        <div className="w-1/4 bg-white rounded-lg shadow-lg p-4 border border-gray-300 mr-4">
          <label htmlFor="batch" className="block text-gray-700 mb-2">Select Batch</label>
          <select id="batch" className="w-full border border-gray-300 rounded-lg p-2">
            <option value="Y-18">Y-18</option>
            <option value="Y-19">Y-19</option>
            <option value="Y-20">Y-20</option>
            <option value="Y-21">Y-21</option>
            <option value="Y-22">Y-22</option>
            <option value="Y-23">Y-23</option>
            <option value="Y-24">Y-24</option>
          </select>
        </div>
        <div className="flex-grow bg-white rounded-lg shadow-lg p-4 border border-gray-300">
          <p className="text-center text-gray-600">Quiz Info.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
