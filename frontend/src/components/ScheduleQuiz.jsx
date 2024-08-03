import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom'; 

const ScheduleQuiz = () => {
  const [batch, setBatch] = useState('');
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [error, setError] = useState('');
  const batchList = ['Y-18', 'Y-19', 'Y-20', 'Y-21', 'Y-22', 'Y-23', 'Y-24'];

  const navigate = useNavigate();

  useEffect(() => {
    if (batch) {
      const fetchCourses = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses`, {
            params: { batch },
            withCredentials: true
          });

          console.log('Courses:', response.data);

          setCourses(response.data.data);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };

      fetchCourses();
    }
  }, [batch]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/locations`, {
          withCredentials: true
        });

        console.log('Locations:', response.data);

        setLocations(response.data.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const startDay = startTime.getDate();
    const endDay = endTime.getDate();

    if (startTime < now) {
      setError('Start time must be after the current time.');
      return;
    }

    if (startDay !== endDay) {
      setError('Start time and End time must be on the same day.');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/quizzes/schedule`, {
        batch,
        course,
        location,
        startTime,
        endTime,
      }, {
        withCredentials: true 
      });
      console.log('Quiz scheduled:', response.data);
      setError('');
      
      navigate('/faculty-portal');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error scheduling quiz. Please try again.';
      console.error('Error scheduling quiz:', error);
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-6 bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 rounded-md">
      <h1 className="text-3xl font-bold text-center text-teal-700 mb-4">Schedule Quiz</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4 border border-gray-300">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="batch" className="block text-gray-700 mb-2">Select Batch</label>
          <select
            id="batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="">Select Batch</option>
            {batchList.map((batch) => (
              <option key={batch} value={batch}>{batch}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="course" className="block text-gray-700 mb-2">Select Course</label>
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            disabled={!batch}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>{course.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 mb-2">Select Location</label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            disabled={!course}
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.name}>{location.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="start-time" className="block text-gray-700 mb-2">Start Time</label>
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
            timeIntervals={15}
            dateFormat="Pp"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="end-time" className="block text-gray-700 mb-2">End Time</label>
          <DatePicker
            selected={endTime}
            onChange={(date) => setEndTime(date)}
            showTimeSelect
            timeIntervals={15}
            dateFormat="Pp"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600"
        >
          Schedule Quiz
        </button>
      </form>
    </div>
  );
};

export default ScheduleQuiz;
