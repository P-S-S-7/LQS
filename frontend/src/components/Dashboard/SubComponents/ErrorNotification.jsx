import React from 'react';

const ErrorNotification = ({ message }) => {
  return (
    <div className="bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 mb-4">
      <p className="text-center">{message}</p>
    </div>
  );
};

export default ErrorNotification;
