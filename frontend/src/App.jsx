import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import  {Layout } from './Template/Layout.jsx';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import StudentPortal from './components/StudentPortal';
import FacultyPortal from './components/FacultyPortal';
import ScheduleQuiz from './components/ScheduleQuiz';


const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>} >,
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/student-portal" element={<StudentPortal />} />
        <Route path="/faculty-portal" element={<FacultyPortal />} />

        <Route path="/schedule-quiz" element={<ScheduleQuiz />} />
      </Route>
    )
);

function App() {
    return (
      <RouterProvider router={router} />
    );
}

export default App;
