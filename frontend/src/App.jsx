import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home';
import SignIn from './components/SignIn';

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} >,
        <Route path="" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    )
);

function App() {
    return (
      <RouterProvider router={router} />
    );
}

export default App;
