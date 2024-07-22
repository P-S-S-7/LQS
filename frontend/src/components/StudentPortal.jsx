import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logout from './Logout';
import { REACT_APP_API_URI } from '../constants.js';

const StudentPortal = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [batch, setBatch] = useState('');
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URI}/users/user-details`, {
          withCredentials: true, // httpOnly cookies are sent automatically with axios requests
        });
        setEmail(response.data.data.email);
        setName(response.data.data.name);
        console.log('Response Data:', response.data);
      } catch (error) {
        console.error('Error fetching email:', error);
      }
    };

    fetchEmail();
  }, []);

  useEffect(() => {
    if (batch) {
      const fetchQuizzes = async () => {
        try {
          const response = await axios.get(`${REACT_APP_API_URI}/quizzes`, {
            withCredentials: true,
            params: { batch },
          });
          const sortedQuizzes = response.data.data.sort(
            (a, b) => new Date(a.startTime) - new Date(b.startTime)
          );
          setQuizzes(sortedQuizzes);
          console.log('Quizzes:', sortedQuizzes);
        } catch (error) {
          console.error('Error fetching quizzes:', error);
        }
      };

      fetchQuizzes();
    }
  }, [batch]);

  return (
    <div className="flex flex-col h-[90vh] w-full bg-gradient-to-r from-blue-100 via-teal-100 to-lime-100 p-6 mx-3 my-7 mb-7 rounded-md">
      <div className="relative mb-6">
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-2">
          Student Portal
        </h1>
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <Logout />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300 mb-4">
        <p className="text-center text-gray-800 font-medium">Email: {email}</p>
        <p className="text-center text-gray-800 font-medium">Name: {name}</p>
      </div>
      <div className="flex-grow flex">
        <div className="w-1/4 bg-white rounded-lg shadow-md p-4 border border-gray-300 mr-4">
          <label htmlFor="batch" className="block text-gray-700 mb-2">Select Batch</label>
          <select 
            id="batch" 
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
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
        </div>
        <div className="flex-grow bg-white rounded-lg shadow-md p-4 border border-gray-300">
          {quizzes.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-teal-200 text-teal-800 border-b">
                  <th className="py-2 px-4 border-r">Date</th>
                  <th className="py-2 px-4 border-r">Course</th>
                  <th className="py-2 px-4 border-r">Start Time</th>
                  <th className="py-2 px-4">End Time</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => {
                  const startDate = new Date(quiz.startTime);
                  const endDate = new Date(quiz.endTime);
                  const timeOptions = { hour: '2-digit', minute: '2-digit' };
                  return (
                    <tr key={quiz._id} className="hover:bg-teal-50">
                      <td className="py-2 px-4 border-r">{startDate.toLocaleDateString()}</td>
                      <td className="py-2 px-4 border-r">{quiz.course}</td>
                      <td className="py-2 px-4 border-r">{startDate.toLocaleTimeString([], timeOptions)}</td>
                      <td className="py-2 px-4">{endDate.toLocaleTimeString([], timeOptions)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600">No quizzes scheduled for this batch.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
