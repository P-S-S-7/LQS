import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/lnmiit.png';

function Home() {
    return (
        <section className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 to-blue-400 text-white rounded-lg">
            <div className="flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-4xl md:text-5xl font-bold mb-4">
                    LNMIIT Quiz Scheduler
                </h3>
                <img
                    src={logo}
                    alt="LNMIIT Logo"
                    className="rounded-full h-32 w-32 md:h-40 md:w-40 object-cover mb-4"
                />
                <Link
                    to="/sign-in"
                    className="bg-gradient-to-br from-purple-700 to-blue-500 text-gray-800 py-2 px-6 rounded-lg shadow-md transition duration-300 text-sm md:text-base"
                >
                   <strong>GET STARTED</strong> 
                </Link>
            </div>
            <footer className="text-center text-gray-300 py-2">
                @created by - pss
            </footer>
        </section>
    );
}

export default Home;
