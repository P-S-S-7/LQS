import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { passwordRegex, studentEmailRegex, nameRegex } from '../../constants';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Template/Toast.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [branch, setBranch] = useState('');
    const [department, setDepartment] = useState('');
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

        if (!name) {
            toast.error('Name is required');
            return;
        }

        if (!nameRegex.test(name)) {
            toast.error('Invalid name format. Every word should start with a capital letter and cannot contain digits or special characters.');
            return;
        }

        if (role !== 'Student' && role !== 'Faculty') {
            toast.error('Select a valid role');
            return;
        }

        if (!email) {
            toast.error('Email is required');
            return;
        }

        if (role === 'Student' && !studentEmailRegex.test(email)) {
            toast.error('Invalid email address');
            return;
        }

        if (!password) {
            toast.error('Password is required');
            return;
        }

        if (!passwordRegex.test(password)) {
            toast.error('Password must be at least 8 characters long and contain at least one letter, one number, and one special character.');
            return;
        }

        if (role === 'Student' && !branch) {
            toast.error('Branch is required. Check your email address.');
            return;
        }

        if (role === 'Faculty' && !department) {
            toast.error('Department is required');
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
                toast.success('Registration successful. Please verify your email address. Check your inbox or spam folder. Redirecting to login...');
                setTimeout(() => navigate('/login'), 5000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
            console.error('Signup Error:', error);
            toast.error(errorMessage);
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
            className="bg-white w-full sm:w-[85%] lg:w-[65%] p-6 sm:p-8 rounded-sm font-Poppins"
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
                toastClassName="custom-toast"
                bodyClassName="custom-toast-body"
            />
            <div className="flex flex-col items-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-red-600 mb-6 sm:mb-8">Sign Up</h2>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="space-y-4 sm:space-y-5">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-base sm:text-lg font-medium text-red-600 mb-2"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-10 sm:h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="role"
                                className="block text-base sm:text-lg font-medium text-red-600 mb-2"
                            >
                                Select Role
                            </label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full h-10 sm:h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                            >
                                <option value="">Select your role</option>
                                <option value="Student">Student</option>
                                <option value="Faculty">Faculty</option>
                            </select>
                        </div>
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
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-10 sm:h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-base sm:text-lg font-medium text-red-600 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-10 sm:h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                                >
                                    {showPassword ? <EyeSlashIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" /> : <EyeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />}
                                </button>
                            </div>
                        </div>
                        {role === 'Student' && (
                            <div>
                                <label
                                    htmlFor="branch"
                                    className="block text-base sm:text-lg font-medium text-red-600 mb-2"
                                >
                                    Branch
                                </label>
                                <input
                                    type="text"
                                    id="branch"
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    className="w-full h-10 sm:h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                    readOnly
                                />
                            </div>
                        )}
                        {role === 'Faculty' && (
                            <div>
                                <label
                                    htmlFor="department"
                                    className="block text-base sm:text-lg font-medium text-red-600 mb-2"
                                >
                                    Department
                                </label>
                                <input
                                    type="text"
                                    id="department"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className="w-full h-10 sm:h-12 px-3 py-2 text-base border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:border-red-500 focus:ring-red-500 bg-white text-gray-900"
                                    placeholder="Enter your department"
                                    required
                                />
                            </div>
                        )}
                        <div className="mt-6 sm:mt-8">
                            <button
                                type="submit"
                                className="w-full h-10 sm:h-12 flex justify-center items-center bg-red-600 text-white text-base sm:text-lg font-bold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </form>
                <p className="mt-4 sm:mt-6 text-red-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-red-700 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </motion.div>
    );
};

export default Signup;
