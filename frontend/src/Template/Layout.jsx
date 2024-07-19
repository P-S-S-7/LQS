import React from 'react'
import { Outlet } from 'react-router-dom'

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
            <Outlet />
        </div>
    )
}

export { Layout }
