import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/forgot-password`, { email });
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response ? err.response.data.message : 'An error occurred. Please try again.');
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
                    Forgot Password
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
                                htmlFor="email"
                                className="block text-lg font-medium text-red-600 mb-2"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="h-12 flex border-red-600 text-white border-[2.5px] bg-red-600 px-3 font-semibold py-2 rounded-md hover:bg-white hover:text-red-600 transition-colors justify-center items-center"
                            >
                                Send Reset Link{' '}
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

export default ForgotPassword;
