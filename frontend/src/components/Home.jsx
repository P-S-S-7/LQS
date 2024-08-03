import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/lnmiit.png';

function Home() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = async () => {
        setLoading(true);
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

    return (
        <div style={{ maxWidth: '700px', width: '100%', padding: '20px', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }}>
            <section className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 to-blue-400 text-white rounded-lg">
                <div className="flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-4xl md:text-5xl font-bold mb-4">LNMIIT Quiz Scheduler</h3>
                    <img src={logo} alt="LNMIIT Logo" className="rounded-full h-32 w-32 md:h-40 md:w-40 object-cover mb-4" />
                    <button
                        onClick={handleClick}
                        className="bg-gradient-to-br from-purple-700 to-blue-500 text-gray-800 py-2 px-6 rounded-lg shadow-md transition duration-300 text-sm md:text-base flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loader"></span>
                        ) : (
                            <strong>GET STARTED</strong>
                        )}
                    </button>
                </div>
                <footer className="text-center text-gray-300 py-2">@created by ~pss</footer>
            </section>
            <style>
                {`
                    .loader {
                        border: 4px solid rgba(255, 255, 255, 0.1);
                        border-radius: 50%;
                        border-top: 4px solid #fff;
                        width: 24px;
                        height: 24px;
                        animation: spin 1s linear infinite;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
}

export default Home;
