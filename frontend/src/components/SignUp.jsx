import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { REACT_APP_API_URI, passwordRegex, studentEmailRegex, facultyEmailRegex, nameRegex } from '../constants.js'; 

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Student');
    const [branch, setBranch] = useState('');
    const [department, setDepartment] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !role || (role === 'Student' && !branch) || (role === 'Faculty' && !department)) {
            setError('All fields are required');
            return;
        }

        if (!nameRegex.test(name)) {
            setError('Invalid name format.Every word should start with a capital letter.');
            return;
        }

        if(role === 'Student' && !studentEmailRegex.test(email)) {
            setError('Invalid email address');
            return;
        }

        if(role === 'Faculty' && !facultyEmailRegex.test(email)) {
            setError('Invalid email address');
            return;
        }

        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long and contain at least one letter, one number, and one special character.');
            return;
        }

        try {
            const response = await axios.post(`${REACT_APP_API_URI}/users/signup`, {
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
                console.log('User registered successfully:', response.data);
                navigate('/login'); 
            }
        } catch (error) {
            alert('Error registering user: ' + error.response?.data?.error + ' ' + '\n Check console for more details');
        }
    };

    return (
        <div style={{ maxWidth: '400px', width: '100%', padding: '20px', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }}>
            <div className="bg-gradient-to-br from-purple-400 to-blue-400 bg-opacity-90 p-6 sm:p-8 lg:p-10 rounded-md shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 text-sm placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-900">Select Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                        >
                            <option value="Student">Student</option>
                            <option value="Faculty">Faculty</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 text-sm placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 text-sm placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {role === 'Student' && (
                        <div>
                            <label htmlFor="branch" className="block text-sm font-medium text-gray-900">Branch</label>
                            <select
                                id="branch"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                            >
                                <option value="">Select your branch</option>
                                <option value="CSE">CSE</option>
                                <option value="CCE">CCE</option>
                                <option value="ECE">ECE</option>
                                <option value="MME">MME</option>
                            </select>
                        </div>
                    )}
                    {role === 'Faculty' && (
                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-gray-900">Department</label>
                            <select
                                id="department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
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
                    <button
                        type="submit"
                        className="w-full h-10 flex items-center justify-center rounded-md bg-gradient-to-br from-purple-700 to-blue-700 text-white font-semibold leading-7 hover:opacity-90"
                    >
                        Sign Up{' '}
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
                </form>
                <p className="mt-4 text-sm text-gray-900">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-purple-800 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
