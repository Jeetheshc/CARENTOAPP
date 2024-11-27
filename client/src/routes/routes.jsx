import { createBrowserRouter } from "react-router-dom";

import { CarBookings } from "../pages/user/CarBookings";
import { CarBookingslist } from "../pages/user/CarBookingslist";
import { CarDetails } from "../pages/user/CarDetails";
import { Cars } from "../pages/user/cars";
import { Contact } from "../pages/user/Contact";
import { Home } from "../pages/user/Home";
import { Profile } from "../pages/user/Profile";
import { Profilechangepassword } from "../pages/user/profilechangepassword";
import { ProfileChangePhoto } from "../pages/user/ProfileChangePhoto";
import { ProfileDeactivate } from "../pages/user/ProfileDeactivate";
import { UserLayout } from "../layout/userLayout";
import Signup from "../pages/shared/Signup";
import Login from "../pages/shared/Login";
import ErrorPage from "../pages/shared/ErrorPage";

import About from "../pages/user/About";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        errorElement:<ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "about",
                element: <About/>,
            },
            {
                path: "carBookings",
                element: <CarBookings />,
            },
            {
                path: "carBookingsList",
                element: <CarBookingslist />,
            },
            {
                path: "carDetails",
                element: <CarDetails />,
            },
            {
                path: "cars",
                element: <Cars />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "profileChangePassword",
                element: <Profilechangepassword />,
            },
            {
                path: "profileChangePhoto",
                element: <ProfileChangePhoto />,
            },
            {
                path: "profileDeactivate",
                element: <ProfileDeactivate />,
            },

        ]
    },


]);
