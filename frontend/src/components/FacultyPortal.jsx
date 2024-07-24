import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import { REACT_APP_API_URI } from '../constants.js';

const FacultyPortal = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [batch, setBatch] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [userQuizzes, setUserQuizzes] = useState([]);
  const [viewType, setViewType] = useState('batch');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URI}/users/user-details`, {
          withCredentials: true,  // httpOnly cookies are sent automatically with axios requests
        });
        setEmail(response.data.data.email);
        setName(response.data.data.name);
        console.log('Response Data:', response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching user details'); 
        console.error('Error fetching user details:', error);
      }
    };

    fetchEmail();
  }, []);

  useEffect(() => {
    if (batch && viewType === 'batch') {
      const fetchQuizzes = async () => {
        try {
          const response = await axios.get(`${REACT_APP_API_URI}/quizzes/batch`, {
            withCredentials: true,
            params: { batch },
          });

          const now = new Date();
          const quizzes = response.data.data.filter(quiz => new Date(quiz.endTime) >= now);

          const sortedQuizzes = quizzes.sort(
            (a, b) => new Date(a.startTime) - new Date(b.startTime)
          );
          setQuizzes(sortedQuizzes);
          console.log('Quizzes:', sortedQuizzes);
        } catch (error) {
          setError(error.response?.data?.message || 'Error fetching quizzes'); 
          console.error('Error fetching quizzes:', error);
        }
      };

      fetchQuizzes();
    }
  }, [batch, viewType]);

  const handleNavigateToScheduleQuiz = () => {
    navigate('/schedule-quiz');
  };

  const handleFetchUserQuizzes = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URI}/quizzes/user`, {
        withCredentials: true,
      });
      const sortedQuizzes = response.data.data;

      setUserQuizzes(sortedQuizzes);
      console.log('User Quizzes:', sortedQuizzes);
      setViewType('user');
      setBatch('');
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching user quizzes'); 
      console.error('Error fetching user quizzes:', error);
    }
  };

  const handleBatchChange = (e) => {
    setBatch(e.target.value);
    setViewType('batch');
  };

  const handleDeleteQuiz = async (quizId) => {
    const isConfirmed = window.confirm('Do you want to delete this quiz?');

    if (isConfirmed) {
      try {
        await axios.delete(`${REACT_APP_API_URI}/quizzes/delete/${quizId}`, {
          withCredentials: true,
        });

        setUserQuizzes(userQuizzes.filter(quiz => quiz._id !== quizId));
        console.log('Quiz deleted:', quizId);
      } catch (error) {
        setError(error.response?.data?.message || 'Error deleting quiz'); 
        console.error('Error deleting quiz:', error);
      }
    } else {
      console.log('Quiz deletion cancelled');
    }
  };

  return (
    <div className="flex flex-col h-[90vh] w-full bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 p-6 mx-3 my-7 mb-7 rounded-md">
      <div className="relative mb-6">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-2">
          Faculty Portal
        </h1>
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <Logout />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300 mb-4">
        <p className="text-center text-gray-800 font-medium">Email: {email}</p>
        <p className="text-center text-gray-800 font-medium">Name: {name}</p>
      </div>
      {error && (
        <div className="bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 mb-4">
          <p className="text-center">{error}</p>
        </div>
      )}
      <div className="flex-grow flex">
        <div className="w-1/4 bg-white rounded-lg shadow-md p-4 border border-gray-300 mr-4">
          <label htmlFor="batch" className="block text-gray-700 mb-2">Select Batch</label>
          <select
            id="batch"
            value={batch}
            onChange={handleBatchChange}
            className="w-full border border-gray-300 rounded-lg p-2 bg-blue-50 text-gray-700"
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
          <button
            onClick={handleNavigateToScheduleQuiz}
            className="mt-4 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600"
          >
            Schedule Quiz
          </button>
          <button
            onClick={handleFetchUserQuizzes}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            View Your Scheduled Quizzes
          </button>
        </div>
        <div className="flex-grow bg-white rounded-lg shadow-md p-4 border border-gray-300">
          {viewType === 'batch' && batch && quizzes.length > 0 ? (
            <>
              <h2 className="text-center text-xl font-bold text-purple-800 mb-4">
                Quizzes for Batch {batch}
              </h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-100 text-purple-800 border-b">
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
                      <tr key={quiz._id} className="hover:bg-purple-50 text-center">
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
            </>
          ) : viewType === 'batch' && batch ? (
            <p className="text-center text-gray-700">No quizzes scheduled for this batch.</p>
          ) : viewType === 'user' && userQuizzes.length > 0 ? (
            <>
              <h2 className="text-center text-xl font-bold text-blue-800 mb-4">
                Your Scheduled Quizzes
              </h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100 text-blue-800 border-b">
                    <th className="py-2 px-4 border-r">Date</th>
                    <th className="py-2 px-4 border-r">Batch</th>
                    <th className="py-2 px-4 border-r">Course</th>
                    <th className="py-2 px-4 border-r">Start Time</th>
                    <th className="py-2 px-4">End Time</th>
                    <th className='py-2 px-4'>Location</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userQuizzes.map((quiz) => {
                    const startDate = new Date(quiz.startTime);
                    const endDate = new Date(quiz.endTime);
                    const timeOptions = { hour: '2-digit', minute: '2-digit' };
                    return (
                      <tr key={quiz._id} className="hover:bg-blue-50 text-center">
                        <td className="py-2 px-4 border-r">{startDate.toLocaleDateString()}</td>
                        <td className="py-2 px-4 border-r">{quiz.batch}</td>
                        <td className="py-2 px-4 border-r">{quiz.course}</td>
                        <td className="py-2 px-4 border-r">{startDate.toLocaleTimeString([], timeOptions)}</td>
                        <td className="py-2 px-4">{endDate.toLocaleTimeString([], timeOptions)}</td>
                        <td className="py-2 px-4">{quiz.location}</td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleDeleteQuiz(quiz._id)}
                            className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : viewType === 'user' ? (
            <p className="text-center text-gray-700">No quizzes scheduled by you.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FacultyPortal;
