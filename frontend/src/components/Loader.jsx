import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';
import { motion } from 'framer-motion';

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/health`);
        if (response.status === 200) {
          navigate('/login');
        } else {
          console.error('Backend connection failed');
          alert('Failed to connect to the backend. Please try again later.');
        }
      } catch (error) {
        console.error('Error connecting to the backend', error);
        alert('Failed to connect to the backend. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    checkBackendConnection();
  }, [navigate]);

  if (loading) {
    return (
      <div className="relative flex flex-col justify-center items-center min-h-screen bg-white p-6 overflow-hidden">
        <motion.div
          className="relative text-6xl font-extrabold text-red-600 mb-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          LNMQuiz
        </motion.div>
        <div className="relative flex flex-col items-center mb-6">
          <BounceLoader
            color="#e60012"
            size={60}
          />
          <motion.img 
            src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" 
            alt="Thinking Avatar"
            className="rounded-full h-48 w-48 mt-6 ml-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default Loader;
