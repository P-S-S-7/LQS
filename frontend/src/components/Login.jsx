import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_API_URI } from '../constants.js';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function Login() {
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

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
            console.log('Submitting form with:', { email, password, role });
            const response = await axios.post(`${REACT_APP_API_URI}/users/login`, {
                email,
                password,
                role
            }, {
                withCredentials: true
            });

            const jsonResponse = JSON.parse(JSON.stringify(response.data));
            console.log('Login successful:', jsonResponse);

            const responseRole = jsonResponse.data.user.role;

            if (responseRole === 'Student' && role === 'Student') {
                navigate('/student-portal');
            } else if (responseRole === 'Faculty' && role === 'Faculty') {
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
        <div style={{ maxWidth: '400px', width: '100%', padding: '20px', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }}>
            <div className="bg-gradient-to-br from-purple-400 to-blue-400 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md rounded-md shadow-lg">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold leading-tight text-gray-800 mb-4">
                        Login
                    </h2>
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="w-full max-w-sm">
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="role"
                                    className="text-base font-medium text-gray-900"
                                >
                                    Select Role
                                </label>
                                <div>
                                    <select
                                        id="role"
                                        value={role}
                                        onChange={handleRoleChange}
                                        className="w-full h-10 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    >
                                        <option value="">Select Role</option>
                                        <option value="Student">Student</option>
                                        <option value="Faculty">Faculty</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-base font-medium text-gray-900"
                                >
                                    Email address
                                </label>
                                <div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className="w-full h-10 px-3 py-2 text-sm placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="text-base font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        className="w-full h-10 px-3 py-2 text-sm placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 focus:outline-none"
                                    >
                                        {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <Link
                                        to="/forgot-password"
                                        className="font-medium text-gray-900 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full h-10 flex items-center justify-center rounded-md bg-gradient-to-br from-purple-700 to-blue-700 text-white px-3.5 py-2.5 font-semibold leading-7 hover:opacity-90"
                                    >
                                        Login{' '}
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
                        </div>
                    </form>
                    <p className="mt-4 text-sm text-gray-900">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="font-semibold text-purple-800 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
