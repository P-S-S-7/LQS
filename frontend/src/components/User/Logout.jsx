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
            className=" border-red-500 text-red-500 border-[2.5px] px-3 font-semibold py-2 rounded-md hover:text-gray-100 hover:bg-red-500 transition-colors duration-300"
        >
            Logout
        </button>
    );
};

export default Logout;
