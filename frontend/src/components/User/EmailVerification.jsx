import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Template/Toast.css';

const EmailVerification = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            handleVerifyEmail();
        }
    }, [token]);

    const handleVerifyEmail = async () => {
        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/users/verify-email/${token}`);
            toast.success('Your email has been verified successfully! Redirecting to login...');
            setTimeout(() => navigate('/login'), 5000);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error verifying email');
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
                <h1 className="text-3xl font-extrabold text-red-600 mb-8">Email Verification</h1>
                <p className="text-base text-red-600 mb-8">Verifying your email, please wait...</p>
                {loading && <p className="text-blue-500 text-center">Verifying...</p>}
            </div>
        </motion.div>
    );
};

export default EmailVerification;
