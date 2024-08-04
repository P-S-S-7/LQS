import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
    
    

    return (
        <div style={{
            backgroundImage: 'url("https://res.cloudinary.com/dds1tocvk/image/upload/v1722766202/lnmiit.png")',
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
