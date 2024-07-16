import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
    const [role, setRole] = useState('Student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // add authentication logic here
        console.log('Role:', role);
        console.log('Email:', email);
        console.log('Password:', password);
        // redirect after successful sign-in
    };

    return (
        <section className="flex items-center justify-center bg-gradient-to-br from-purple-400 to-blue-400">
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
                        Sign In
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
                                        className="w-full h-10 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    >
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
                                        Sign In{' '}
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
                            to="/sign-up"
                            className="font-semibold text-purple-800 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default SignIn;