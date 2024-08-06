import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';

const UserProfile = ({ name, email, role }) => {
  return (
    <div className="relative group cursor-pointer flex items-center gap-1">
      <UserIcon className="w-6 h-6 text-green-700 font-bold" />
      <p className="text-lg font-semibold text-green-700">Profile</p>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-full mr-4 bg-white shadow-lg rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-96">
        <p className="text-sm text-gray-800"><strong>Role:</strong> {role}</p>
        <p className="text-sm text-gray-800"><strong>Email:</strong> {email}</p>
        <p className="text-sm text-gray-800"><strong>Name:</strong> {name}</p>
      </div>
    </div>
  );
};

export default UserProfile;
