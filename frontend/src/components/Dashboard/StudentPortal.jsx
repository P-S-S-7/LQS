import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logout from '../User/Logout';
import UserProfile from './SubComponents/UserProfile'; 
import QuizzesTable from './SubComponents/QuizzesTable';  
import ErrorNotification from './SubComponents/ErrorNotification'; 
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

const StudentPortal = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [batch, setBatch] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedInAndFetchDetails = async () => {
      try {
        const userDetailsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users/user-details`, {
          withCredentials: true,
        });

        if (userDetailsResponse.data.data.role !== 'Student') {
          navigate('/login');
        }

        setEmail(userDetailsResponse.data.data.email);
        setName(userDetailsResponse.data.data.name);
        setRole(userDetailsResponse.data.data.role);
        console.log('User Details Response:', userDetailsResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          setError(error.response?.data?.message || 'Error fetching user details');
          console.error('Error fetching user details:', error);
        }
      } finally {
        setLoading(false);
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

  const handleBatchChange = (event) => {
    setBatch(event.target.value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <EllipsisHorizontalIcon
          className="w-24 h-24 text-gradient animate-spin"
          style={{
            background: 'linear-gradient(45deg, #f0f4f8, #dce2e6)',
            WebkitBackgroundClip: 'text',
          }}
        />
      </div>
    );
  }

  return (
    <div className="font-Poppins flex flex-col h-[90vh] w-full bg-dashBoardBg p-6 mx-3 my-7 mb-7 rounded-lg">
      <div className="flex mb-6 items-center justify-between">
        <h1 className="text-3xl border-b-4 border-l-4 pl-3 pb-2 pt-1 border-red-500 shadow-sm rounded-sm font-semibold text-center text-gray-800 mb-2 select-none">
          Dashboard
        </h1>
        <div className="flex items-center gap-12">
          <UserProfile name={name} email={email} role={role} />
          <div className="flex items-center mr-6">
            <Logout />
          </div>
        </div>
      </div>
      {error && <ErrorNotification message={error} />}
      <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-300 mb-4 h-full my-4">
        <div className="mx-auto p-4">
          <div className="w-full max-w-md mx-auto">
            <label htmlFor="batch" className="block text-gray-900 font-semibold mb-2 text-center">
              Select Batch
            </label>
            <select
              id="batch"
              value={batch}
              onChange={handleBatchChange}
              className="w-full border border-gray-500 rounded-lg p-2 bg-gray-50 text-gray-900"
            >
              <option value="">Select Batch</option>
              <option value="Y-20">Y-20</option>
              <option value="Y-21">Y-21</option>
              <option value="Y-22">Y-22</option>
              <option value="Y-23">Y-23</option>
              <option value="Y-24">Y-24</option>
            </select>
          </div>

          {batch && (
            <QuizzesTable quizzes={quizzes} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
