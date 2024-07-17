import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
    const [role, setRole] = useState('Student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [branch, setBranch] = useState('CSE');
    const [department, setDepartment] = useState('Computer Science'); 

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        setRole(selectedRole);
        setEmail('');
        setPassword('');
        if (selectedRole === 'Student') {
            setBranch('CSE');
        } else {
            setDepartment('Computer Science');
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleBranchChange = (e) => {
        setBranch(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // add sign-up logic here
        console.log('Role:', role);
        console.log('Email:', email);
        console.log('Password:', password);
        if (role === 'Student') {
            console.log('Branch:', branch);
        } else {
            console.log('Department:', department);
        }
        // redirect after successful sign-up
    };

    return (
        <section className="flex items-center justify-center bg-gradient-to-br from-purple-400 to-blue-400 min-h-screen">
            <div className="bg-gradient-to-br from-purple-400 to-blue-400 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md rounded-md shadow-lg">
                <div className="flex flex-col items-center">
                    <svg
                        width="50"
                        height="56"
                        viewBox="0 0 50 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-purple-700 mb-4"
                    >
                        <path
                            d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                    <h2 className="text-2xl font-bold leading-tight text-gray-800 mb-4">
                        Sign Up
                    </h2>
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
                                        className="w-full h-10 px-3 py-2 text-sm placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    >
                                        <option value="Student">Student</option>
                                        <option value="Faculty">Faculty</option>
                                    </select>
                                </div>
                            </div>
                            {role === 'Student' ? (
                                <div>
                                    <label
                                        htmlFor="branch"
                                        className="text-base font-medium text-gray-900"
                                    >
                                        Select Branch
                                    </label>
                                    <div>
                                        <select
                                            id="branch"
                                            value={branch}
                                            onChange={handleBranchChange}
                                            className="w-full h-10 px-3 py-2 text-sm placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                                        >
                                            <option value="CSE">Computer Science and Engineering</option>
                                            <option value="ECE">Electronics and Communication Engineering</option>
                                            <option value="MME">Mechanical- Mechatronics Engineering</option>
                                            <option value="CCE">Communication and Computer Engineering</option>
                                        </select>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label
                                        htmlFor="department"
                                        className="text-base font-medium text-gray-900"
                                    >
                                        Select Department
                                    </label>
                                    <div>
                                        <select
                                            id="department"
                                            value={department}
                                            onChange={handleDepartmentChange}
                                            className="w-full h-10 px-3 py-2 text-sm placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                                        >
                                            <option value="Communication and Computer Engineering">Communication and Computer Engineering</option>
                                            <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                                            <option value="Mechanical- Mechatronics Engineering">Mechanical- Mechatronics Engineering</option>
                                            <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                                            <option value="Humanities and Social Sciences">Humanities and Social Sciences</option>
                                            <option value="Physics">Physics</option>
                                            <option value="Mathematics">Mathematics</option>
                                        </select>
                                    </div>
                                </div>
                            )}
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
                                <div>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        className="w-full h-10 px-3 py-2 text-sm placeholder-gray-400 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="w-full h-10 flex items-center justify-center rounded-md bg-gradient-to-br from-purple-700 to-blue-700 text-white px-3.5 py-2.5 font-semibold leading-7 hover:opacity-90"
                                >
                                    Sign Up{' '}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="currentColor"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="ml-1"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6.94.47a.75.75 0 0 1 .75 0l6.5 3.5a.75.75 0 0 1 0 1.06l-6.5 3.5a.75.75 0 0 1-.75 0l-6.5-3.5a.75.75 0 0 1 0-1.06l6.5-3.5zM8 4.32L2.56 7.5 8 10.68l5.44-3.18L8 4.32z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                    <p className="text-sm text-gray-600 mt-4">
                        Already have an account?{' '}
                        <Link
                            to="/sign-in"
                            className="font-medium text-purple-700 hover:text-purple-800"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
