import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

function Login() {
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/verify-user`, { withCredentials: true });
                if (response.data.role === 'Student') {
                    navigate('/student-portal');
                } else if (response.data.role === 'Faculty') {
                    navigate('/faculty-portal');
                }
            } catch (error) {
                console.log('User not logged in:', error.response?.data || error.message);
            }
        };

        checkLoggedIn();
    }, [navigate]);

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !role) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
                email,
                password,
                role
            }, {
                withCredentials: true
            });

            const { user } = response.data;
            if (user.role === 'Student' && role === 'Student') {
                navigate('/student-portal');
            } else if (user.role === 'Faculty' && role === 'Faculty') {
                navigate('/faculty-portal');
            } else {
                setError('Invalid role');
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Invalid credentials');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <motion.div
            className="bg-white w-[65%] p-8 rounded-sm font-Poppins"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col items-center">
                {error && (
                    <div className="bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 mb-4">
                    <p className="text-center">{error}</p>
                    </div>
                )}
             <h2 className="text-3xl font-extrabold text-red-600 mb-8">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="space-y-5">
                        <div>
                            <label
                                htmlFor="role"
                                className="block text-lg font-medium text-red-600 mb-2"
                            >
                                Select Role
                            </label>
                            <select 
                                id="role"
                                value={role}
                                onChange={handleRoleChange}
                                className="w-full h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                            >
                                <option value="">Select Role</option>
                                <option value="Student">Student</option>
                                <option value="Faculty">Faculty</option>
                            </select>
                        </div>
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
                            <label
                                htmlFor="password"
                                className="block text-lg font-medium text-red-600 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="w-full h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                    placeholder="Enter your password"
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
                        <div className="flex items-center justify-between">
                            <div className="text-base">
                                <Link
                                    to="/forgot-password"
                                    className="font-semibold text-red-600 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full h-12 flex border-red-600 text-white border-[2.5px] bg-red-600 px-3 font-semibold py-2 rounded-md hover:bg-white hover:text-red-600 transition-colors"
                                >
                                    Login{' '}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
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
                    </div>
                </form>
                <p className="mt-8 text-base text-red-600">
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        className="font-semibold text-red-700 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </motion.div>
    );
}

export default Login;
