import React from 'react';
import Logout from './Logout';

const FacultyPortal = () => {
  return (
    <div className="flex flex-col h-[90vh] w-full bg-gradient-to-r from-green-100 via-teal-100 to-cyan-100 p-6 mx-3 my-7 mb-7 rounded-md">
      <div className="relative mb-6">
        <h1 className="text-3xl font-bold text-center text-teal-800 mb-2">
          Faculty Portal
        </h1>
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <Logout />
        </div>
      </div>
      <div
        className="flex-grow bg-white rounded-lg shadow-lg p-6 border border-gray-300"
        style={{ width: '100%' }}
      >
        <h1 className="text-2xl font-bold text-center text-green-600 mb-4">Welcome, Professor!</h1>
        <p className="text-center text-gray-600">
          Manage your quizzes !!!
        </p>
      </div>
    </div>
  );
};

export default FacultyPortal;
