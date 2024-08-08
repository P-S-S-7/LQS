import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Template/Toast.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/forgot-password`, { email });
            toast.success(response.data.message);
        } catch (err) {
            const errorMessage = err.response ? err.response.data.message : 'An error occurred. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <motion.div
            className="bg-white w-full max-w-lg p-6 sm:p-8 md:p-10 lg:w-[65%] rounded-sm font-Poppins mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="flex flex-col items-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-red-600 mb-6 sm:mb-8">
                    Forgot Password
                </h2>
                <p className="text-sm sm:text-base text-red-600 mb-6 sm:mb-8">
                    Remembered your password?{' '}
                    <Link
                        to="/login"
                        className="font-semibold text-red-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="space-y-4 sm:space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-base sm:text-lg font-medium text-red-600 mb-2"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full h-10 sm:h-12 px-3 py-2 text-sm sm:text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full h-10 sm:h-12 flex border-red-600 text-white border-[2.5px] bg-red-600 px-3 font-semibold py-2 rounded-md hover:bg-white hover:text-red-600 transition-colors justify-center items-center"
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
