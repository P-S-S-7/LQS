import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

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
        <motion.div
            className="bg-white w-[65%] p-8 font-Poppins"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: '500px', width: '100%', padding: '20px' }}
        >
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-extrabold text-red-600 mb-8">Email Verification</h1>
                <p className="text-base text-red-600 mb-8">Verifying your email, please wait...</p>
                {loading && <p className="text-blue-500 text-center">Verifying...</p>}
                {message && (
                    <div className="bg-green-100 text-green-800 border border-green-300 rounded-lg p-4 mb-4">
                        <p className="text-center">{message}</p>
                    </div>
                )}
                {error && (
                    <div className="bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 mb-4">
                        <p className="text-center">{error}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default EmailVerification;
