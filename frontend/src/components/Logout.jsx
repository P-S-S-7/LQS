import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, {}, {
                withCredentials: true
            });

            if (response.status === 200) {
                console.log('Logout successful');
                navigate('/login');
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };


    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
        >
            Logout
        </button>
    );
};

export default Logout;
