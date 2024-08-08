import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import '../../../Template/Toast.css';

const ScheduleQuiz = () => {
  const [batch, setBatch] = useState('');
  const [course, setCourse] = useState(null);
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [courses, setCourses] = useState([]);
  const [locations, setLocations] = useState([]);
  const batchList = ['Y-20', 'Y-21', 'Y-22', 'Y-23', 'Y-24'];

  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const verifyResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users/user-details`, {
            withCredentials: true
        });
        if (verifyResponse.data.data.role !== 'Faculty') {
            navigate('/login');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          toast.error(error.response?.data?.message || 'Error fetching user details');
        }
      }
    };

    verifyUser();
  }, [navigate]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses`, {
          withCredentials: true
        });
        setCourses(response.data.data.map(course => ({ value: course.name, label: course.name })));
      } catch (error) {
        toast.error('Error fetching courses');
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/locations`, {
          withCredentials: true
        });
        setLocations(response.data.data);
      } catch (error) {
        toast.error('Error fetching locations');
      }
    };

    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const startDay = startTime.getDate();
    const endDay = endTime.getDate();

    if (!batch || !course || !location || !startTime || !endTime) {
      toast.error('All fields are required.');
      return;
    }

    if (startTime < now) {
      toast.error('Start time must be after the current time.');
      return;
    }

    if (startDay !== endDay) {
      toast.error('Start time and End time must be on the same day.');
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/quizzes/schedule`, {
        batch,
        course: course.value,
        location,
        startTime,
        endTime,
      }, {
        withCredentials: true
      });
      toast.success('Quiz scheduled successfully!');
      navigate('/faculty-portal');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error scheduling quiz. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="font-Poppins flex flex-col h-[90vh] w-full bg-dashBoardBg p-6 mx-3 my-7 mb-7 rounded-lg">
      <ToastContainer />
      <h1 className="text-3xl pb-2 pt-1 pl-3 font-semibold text-center text-gray-800 mb-4">
        Schedule Quiz
      </h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4 border border-gray-300">
        <div className="mb-4">
          <label htmlFor="batch" className="block text-gray-700 mb-2">Select Batch</label>
          <select
            id="batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="w-full border border-gray-500 rounded-lg p-2 bg-gray-50 text-gray-900"
          >
            <option value="">Select Batch</option>
            {batchList.map((batch) => (
              <option key={batch} value={batch}>{batch}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="course" className="block text-gray-700 mb-2">Select Course</label>
          <Select
            id="course"
            options={courses}
            value={course}
            onChange={setCourse}
            placeholder="Search for a course..."
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 mb-2">Select Location</label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-500 rounded-lg p-2 bg-gray-50 text-gray-900"
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
            className="w-full border border-gray-500 rounded-lg p-2 bg-gray-50 text-gray-900"
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
            className="w-full border border-gray-500 rounded-lg p-2 bg-gray-50 text-gray-900"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Schedule Quiz
        </button>
      </form>
    </div>
  );
};

export default ScheduleQuiz;
