import React from 'react'

function App() {

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">Welcome to LNMIIT Quiz Scheduler</h1>
        <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-center mb-6">
          <p className="text-lg text-gray-300 mb-4">
            This is a user-friendly quiz management app where faculty can create, update, delete, and schedule quizzes.
          </p>
          <p className="text-lg text-gray-300 mb-4">
            Our platform offers an intuitive way to organize quizzes efficiently.
          </p>
          <p className="text-lg text-gray-300 mb-4">
            Faculty members can log in to access all the tools necessary for seamless quiz management.
          </p>
          <p className="text-lg text-gray-300 mb-4">
            Students can easily view scheduled quizzes for their batch subjects.
          </p>
          <p className="text-lg text-gray-300 mb-4">
            Additionally, they can also track the location of each quiz session, ensuring they stay informed about where quizzes are held.
          </p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
        </div>
      </div>
      <footer className="absolute bottom-0 w-full text-center text-gray-400 py-4">
        @created by - pss
      </footer>
    </>
  )
}

export default App
