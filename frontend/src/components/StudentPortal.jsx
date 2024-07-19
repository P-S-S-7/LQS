import React from 'react';
import Logout from './Logout';

const StudentPortal = () => {
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
      <div
        className="flex-grow bg-white rounded-lg shadow-lg p-6 border border-gray-300"
        style={{ width: '100%' }}
      >
        <h1 className="text-2xl font-bold text-center text-teal-600 mb-4">Welcome, Student!</h1>
        <p className="text-center text-gray-600">
          Explore your portal and find quizzes scheduled for your courses.
        </p>
      </div>
    </div>
  );
};

export default StudentPortal;
