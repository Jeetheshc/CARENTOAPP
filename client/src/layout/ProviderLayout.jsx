import React, { useEffect, useState } from 'react'
import Header from '../components/user/Header'
import Footer from '../components/user/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import UserHeader from '../components/user/UserHeader'
import { axiosInstance } from '../config/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { saveUserData } from '../redux/features/UserSlice'

export const ProviderLayout = () => {
    const { isUserAuth, userData } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const location = useLocation();

    const checkUser = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/user/check-user",
            });
            dispatch(saveUserData());
        } catch (error) {
            dispatch(clearUserData());
            console.log(error);
        }
    };


    console.log(isUserAuth, "userauth");
    console.log(userData, "Userdata");
    useEffect(() => {
        checkUser();
    }, [location.pathname]);


    return (
        <div>
            {isUserAuth ? <UserHeader /> : <Header />}
            <div className='min-h-100'>
                <Outlet />
                <Footer />

            </div>
        </div>
    )
}
