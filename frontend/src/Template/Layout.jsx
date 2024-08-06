import React from 'react';
import { Outlet } from 'react-router-dom';
import Home from '../components/Home';

function Layout() {
    return (
        <Home>
            <Outlet />
        </Home>
    );
}

export { Layout };
