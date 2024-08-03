import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            handleVerifyEmail();
        }
    }, [token]);

    const handleVerifyEmail = async () => {
        setLoading(true);
        setError('');
        setMessage('');
        console.log(token);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/users/verify-email/${token}`);
            setMessage('Your email has been verified successfully! Redirecting to login...');
            setTimeout(() => navigate('/login'), 5000);
        } catch (error) {
            setError(error.response?.data?.message || 'Error verifying email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', width: '100%', padding: '20px', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }}>
            <div className="bg-gradient-to-br from-purple-400 to-blue-400 bg-opacity-90 p-6 sm:p-8 lg:p-10 rounded-md shadow-lg w-full  mx-auto">
                <h1 className="text-2xl font-bold text-stone-700 mb-4">Email Verification</h1>
                <p className="mb-6 text-gray-700">Verifying your email, please wait...</p>
                {loading && <p className="text-blue-500">Verifying...</p>}
                {message && <p className="text-green-700 text-center">{message}</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default EmailVerification;
