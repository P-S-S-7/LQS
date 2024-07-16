import React from 'react';
import logo from '../assets/lnmiit.png';

function Home() {
    const handleGetStarted = () => {
        console.log('Get Started clicked');
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-6">
                Welcome to LNMIIT Quiz Scheduler
            </h1>
            <div className="bg-gray-800 rounded-full p-4 mb-8">
                <img
                    src={logo}
                    alt="LNMIIT Logo"
                    className="rounded-full h-40 w-40 md:h-48 md:w-48 object-cover"
                />
            </div>
            <button
                className="border border-slate-800 bg-gray-800 hover:bg-slate-500 text-white hover:text-slate-800 py-3 px-8 rounded-lg shadow-md transition duration-300"
                onClick={handleGetStarted}
            >
                GET STARTED
            </button>
            <footer className="absolute bottom-0 w-full text-center text-gray-300 py-4">
                @created by - pss
            </footer>
        </section>
    );
}

export default Home;
