import React, { useState } from 'react'
import Header from '../components/user/Header'
import Footer from '../components/user/Footer'
import { Outlet } from 'react-router-dom'
import UserHeader from '../components/user/UserHeader'

export const UserLayout = () => {
    const [isUserAuth, setIsUserAuth] = useState(false);
    return (
        <div>
            {isUserAuth ? <UserHeader /> : <Header />}

            <Outlet />
            <Footer />
            
        </div>
    )
}
