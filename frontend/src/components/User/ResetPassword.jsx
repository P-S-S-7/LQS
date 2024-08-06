import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { passwordRegex } from '../../constants';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            setError('Password is required');
            return;
        }

        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long and contain at least one letter, one number, and one special character.');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/reset-password/${token}`, { password });
            setMessage(response.data.message);
            setError('');
            setTimeout(() => navigate('/login'), 2000); 
        } catch (err) {
            setMessage('');
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <motion.div
            className="bg-white w-[65%] p-8 font-Poppins"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col items-center">
                {/* Display messages at the top */}
                {message && (
                    <div className="bg-green-100 text-green-800 border border-green-300 rounded-lg p-4 mb-4">
                        <p className="text-center">{message}</p>
                    </div>
                )}
                {error && (
                    <div className="bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 mb-4">
                        <p className="text-center">{error}</p>
                    </div>
                )}
                <h2 className="text-3xl font-extrabold text-red-600 mb-8">
                    Reset Password
                </h2>
                <p className="text-base text-red-600 mb-8">
                    Remembered your password?{' '}
                    <Link
                        to="/login"
                        className="font-semibold text-red-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="space-y-5">
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-lg font-medium text-red-600 mb-2"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                placeholder="Enter your new password"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="h-12 flex border-red-600 text-white border-[2.5px] bg-red-600 px-3 font-semibold py-2 rounded-md hover:bg-white hover:text-red-600 transition-colors justify-center items-center"
                            >
                                Reset Password{' '}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="ml-2"
                                >
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </motion.div>   
    );
}

export default ResetPassword;
