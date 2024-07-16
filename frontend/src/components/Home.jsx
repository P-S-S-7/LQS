import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/lnmiit.png';

function Home() {

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg">
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <h3 className="text-5xl font-bold mb-6">
                    LNMIIT Quiz Scheduler
                </h3>
                <div className="bg-white rounded-full p-4 mb-6">
                    <img
                        src={logo}
                        alt="LNMIIT Logo"
                        className="rounded-full h-40 w-40 md:h-48 md:w-48 object-cover"
                    />
                </div>
                <Link
                    to="/sign-in"
                    className="bg-white text-gray-800 hover:bg-gray-300 py-3 px-8 rounded-lg shadow-md transition duration-300 mt-8"
                >
                    GET STARTED
                </Link>
            </div>
            <footer className="absolute bottom-0 w-full text-center text-gray-300 py-4">
                @created by - pss
            </footer>
        </section>
    );
}

export default Home;
