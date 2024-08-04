import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';

const StudentPortal = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [batch, setBatch] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedInAndFetchDetails = async () => {
      try {
        // check if user is logged in
        const verifyResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users/verify-user`, { withCredentials: true });
        if (verifyResponse.status === 401) {
          navigate('/login');
          return;
        }
        
        // fetch user details if logged in
        const userDetailsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users/user-details`, {
          withCredentials: true, // httpOnly cookies are sent automatically with axios requests
        });
        setEmail(userDetailsResponse.data.data.email);
        setName(userDetailsResponse.data.data.name);
        console.log('User Details Response:', userDetailsResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          setError(error.response?.data?.message || 'Error fetching user details');
          console.error('Error fetching user details:', error);
        }
      }
    };

    checkLoggedInAndFetchDetails();
  }, [navigate]);

  useEffect(() => {
    if (batch) {
      const fetchQuizzes = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/quizzes/batch`, {
            withCredentials: true,
            params: { batch },
          });

          const now = new Date();
          const quizzes = response.data.data.filter(quiz => new Date(quiz.endTime) >= now);

          const sortedQuizzes = quizzes.sort(
            (a, b) => new Date(a.startTime) - new Date(b.startTime)
          );
          setQuizzes(sortedQuizzes);
        } catch (error) {
          setError(error.response?.data?.message || 'Error fetching quizzes'); 
        }
      };

      fetchQuizzes();
    }
  }, [batch]);

  return (
    <div className="flex flex-col h-[90vh] w-full bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 p-6 mx-3 my-7 mb-7 rounded-lg shadow-lg">
      <div className="relative mb-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          Student Portal
        </h1>
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <Logout />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-300 mb-4">
        {error && <p className="text-red-700 text-center font-medium">{error}</p>} 
        <p className="text-center text-gray-900 font-semibold">Email: {email}</p>
        <p className="text-center text-gray-900 font-semibold">Name: {name}</p>
      </div>
      <div className="flex-grow flex">
        <div className="w-1/4 bg-white rounded-lg shadow-lg p-4 border border-gray-300 mr-4">
          <label htmlFor="batch" className="block text-gray-800 mb-2 font-semibold">Select Batch</label>
          <select 
            id="batch" 
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="w-full border border-gray-400 rounded-lg p-2 bg-teal-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select Batch</option>
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
          {quizzes.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-teal-300 text-teal-900 border-b">
                  <th className="py-2 px-4 border-r">Date</th>
                  <th className="py-2 px-4 border-r">Course</th>
                  <th className="py-2 px-4 border-r">Start Time</th>
                  <th className="py-2 px-4">End Time</th>
                  <th className='py-2 px-4'>Location</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => {
                  const startDate = new Date(quiz.startTime);
                  const endDate = new Date(quiz.endTime);
                  const timeOptions = { hour: '2-digit', minute: '2-digit' };
                  return (
                    <tr key={quiz._id} className="hover:bg-teal-50 text-center">
                      <td className="py-2 px-4 border-r">{startDate.toLocaleDateString()}</td>
                      <td className="py-2 px-4 border-r">{quiz.course}</td>
                      <td className="py-2 px-4 border-r">{startDate.toLocaleTimeString([], timeOptions)}</td>
                      <td className="py-2 px-4">{endDate.toLocaleTimeString([], timeOptions)}</td>
                      <td className="py-2 px-4">{quiz.location}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-700">No quizzes scheduled for this batch.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
