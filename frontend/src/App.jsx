import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import Login from './components/User/Login';
import SignUp from './components/User/SignUp';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import StudentPortal from './components/Dashboard/StudentPortal';
import FacultyPortal from './components/Dashboard/FacultyPortal';
import ScheduleQuiz from './components/Dashboard/SubComponents/ScheduleQuiz';
import EmailVerification from './components/User/EmailVerification';
import { Layout } from './Template/Layout';
import Loader from './components/Loader';


const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Loader />} />
        <Route element={<Layout />} >
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

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
