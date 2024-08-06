import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { passwordRegex, studentEmailRegex, nameRegex } from '../../constants'
import { motion } from 'framer-motion';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [branch, setBranch] = useState('');
    const [department, setDepartment] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (role === 'Student') {
            const branchCode = extractBranchFromEmail(email);
            if (branchCode) {
                setBranch(branchCode);
            } else {
                setBranch('');
            }
        }
    }, [email, role]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        if (!name) {
            setError('Name is required');
            return;
        }

        if (!nameRegex.test(name)) {
            setError('Invalid name format. Every word should start with a capital letter and cannot contain digits or special characters.');
            return;
        }

        if (role !== 'Student' && role !== 'Faculty') {
            setError('Select a valid role');
            return;
        }

        if (!email) {    
            setError('Email is required');
            return;
        }

        if (role === 'Student' && !studentEmailRegex.test(email)) {
            setError('Invalid email address');
            return;
        }

        // if (role === 'Faculty' && !facultyEmailRegex.test(email)) {
        //     setError('Invalid email address');
        //     return;
        // }

        if (!password) {
            setError('Password is required');
            return;
        }

        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long and contain at least one letter, one number, and one special character.');
            return;
        }

        if (role === 'Student' && !branch) {
            setError('Branch is required. Check your email address.');
            return;
        }

        if (role === 'Faculty' && !department) {
            setError('Department is required');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/signup`, {
                name,
                email,
                password,
                role,
                ...(role === 'Student' && { branch }),
                ...(role === 'Faculty' && { department }),
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) {
                setSuccess('Registration successful. Please verify your email address. Check your inbox or spam folder.Redirecting to login...');
            }

            setTimeout(() => navigate('/login'), 5000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
            console.error('Signup Error:', error);
            setError(errorMessage);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const extractBranchFromEmail = (email) => {
        const emailPrefix = email.split('@')[0];
        const branchCode = emailPrefix.slice(2, 5).toUpperCase();
        if (!studentEmailRegex.test(email)) {
            return '';
        }
        switch (branchCode) {
            case 'UCS':
            case 'DCS':
                return 'CSE';
            case 'UEC':
            case 'DEC':
                return 'ECE';
            case 'UME':
                return 'MME';
            case 'UCC':
                return 'CCE';
            default:
                return '';
        }
    };

    return (
        <motion.div
            className="bg-white w-[65%] p-8 rounded-sm font-Poppins"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col items-center">
                <h2 className="text-3xl font-extrabold text-red-600 mb-8">Sign Up</h2>
                {error && (
                    <div className="bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 mb-4">
                        <p className="text-center">{error}</p>
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 text-green-800 border border-green-300 rounded-lg p-4 mb-4">
                        <p className="text-center">{success}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="space-y-5">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-lg font-medium text-red-600 mb-2"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
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
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                            >
                                <option value="">Select your role</option>
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
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                placeholder="Enter your email address"
                                required
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                    placeholder="Enter your password"
                                    required
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
                        {role === 'Student' && (
                            <div>
                                <label
                                    htmlFor="branch"
                                    className="block text-lg font-medium text-red-600 mb-2"
                                >
                                    Branch
                                </label>
                                <input
                                    id="branch"
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    placeholder="Enter your branch"
                                    className="w-full h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                />
                            </div>
                        )}
                        {role === 'Faculty' && (
                            <div>
                                <label
                                    htmlFor="department"
                                    className="block text-lg font-medium text-red-600 mb-2"
                                >
                                    Department
                                </label>
                                <select
                                    id="department"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className="w-full h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                >
                                    <option value="">Select your department</option>
                                    <option value="CSE">CSE</option>
                                    <option value="CCE">CCE</option>
                                    <option value="ECE">ECE</option>
                                    <option value="MME">MME</option>
                                    <option value="PHY">PHY</option>
                                    <option value="HSS">HSS</option>
                                    <option value="MTH">MTH</option>
                                </select>
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <p className="mt-2 text-base text-red-600">
                                Already have an account? {' '}
                                <br/>
                                <Link
                                    to="/login"
                                    className="font-semibold text-red-700 hover:underline"
                                >
                                    Login
                                </Link>
                            </p>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full h-12 flex border-red-600 text-white border-[2.5px] bg-red-600 px-3 font-semibold py-2 rounded-md hover:bg-white hover:text-red-600 transition-colors"
                                >
                                    Sign Up{' '}
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
            </div>
        </motion.div>
    );
};

export default Signup;
