import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div style={{
            backgroundImage: 'url("https://i.postimg.cc/Qt1WFQnF/lnmiit.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '20px', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }}>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
