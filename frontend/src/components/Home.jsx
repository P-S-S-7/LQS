import React from 'react';
import logo from '../../public/lnmiit.png';

function Home() {
    const handleGetStarted = () => {
        console.log('Get Started clicked');
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold text-blue-400 mb-6">
                Welcome to LNMIIT Quiz Scheduler
            </h1>
            <div className="bg-gray-800 rounded-full p-2 mb-8">
                <img
                    src={logo}
                    alt="LNMIIT Logo"
                    className="rounded-full h-32 w-32 md:h-40 md:w-40 object-cover"
                />
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-md transition duration-300"
                onClick={handleGetStarted}
            >
                Get Started
            </button>
            <footer className="absolute bottom-0 w-full text-center text-gray-400 py-4">
                @created by - pss
            </footer>
        </section>
    );
}

export default Home;
