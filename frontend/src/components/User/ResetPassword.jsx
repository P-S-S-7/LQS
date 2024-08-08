import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { passwordRegex } from '../../constants';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Template/Toast.css';

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            toast.error('Password is required');
            return;
        }

        if (!passwordRegex.test(password)) {
            toast.error('Password must be at least 8 characters long and contain at least one letter, one number, and one special character.');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/reset-password/${token}`, { password });
            toast.success('Password reset successful');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || 'An error occurred');
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
                    Reset Password
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
                                htmlFor="password"
                                className="block text-base sm:text-lg font-medium text-red-600 mb-2"
                            >
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="w-full h-10 sm:h-12 px-3 py-2 text-sm sm:text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                    placeholder="Enter your new password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                                >
                                    {showPassword ? <EyeSlashIcon className="h-6 w-6 text-red-600" /> : <EyeIcon className="h-6 w-6 text-red-600" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full h-10 sm:h-12 flex border-red-600 text-white border-[2.5px] bg-red-600 px-3 font-semibold py-2 rounded-md hover:bg-white hover:text-red-600 transition-colors justify-center items-center"
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
