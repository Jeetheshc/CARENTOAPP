import { createBrowserRouter } from "react-router-dom";

import { CarBookings } from "../pages/user/CarBookings";

import  {CarDetails } from "../pages/user/CarDetails";
import { Cars } from "../pages/user/cars";
import { Contact } from "../pages/user/Contact";
import { Home } from "../pages/user/Home";
import { Profile } from "../pages/user/Profile";
import { Profilechangepassword } from "../pages/user/profilechangepassword";
import { ProfileChangePhoto } from "../pages/user/ProfileChangePhoto";
import { ProfileDeactivate } from "../pages/user/ProfileDeactivate";
import { UserLayout } from "../layout/userLayout";
import { Signup } from "../pages/shared/Signup";
import {Login} from "../pages/shared/Login";
import ErrorPage from "../pages/shared/ErrorPage";
import About from "../pages/user/About";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { ProviderLayout } from "../layout/ProviderLayout";
import { AdminLayout } from "../layout/AdminLayout";
import { Carbookinglists } from "../pages/user/Carbookinglists";
import { CarbookingDetails } from "../pages/user/CarbookingDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        errorElement: <ErrorPage />,
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
                element: <About />,
            },
            {
                path: "car/:id",
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
                element: <ProtectedRoutes />,
              path:"user",
                children:
                    [
                       
                        {
                            path: "Carbookinglists",
                            element: <Carbookinglists/>,
                        },
                        {
                            path: "profile",
                            element: <Profile />,
                        },
                        {
                            path: "carBookings",
                            element: <CarBookings />,
                        },
                        {
                            path: "bookings/:id",
                            element: <CarbookingDetails />,
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


        ]
    },
    {
        path: "provider",
        element: <ProviderLayout />,
        errorElement: <ErrorPage />,
        children: [
         
            {
                path: "signup",
                element: <Signup/>,
            },
            {
                path: "login",
                element: <Login role="provider"/>,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "carDetails/:id",
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
                element: <ProtectedRoutes />,
              path:"user",
                children:
                    [
                        {
                            path: "carBookings",
                            element: <CarBookings />,
                        },
                        {
                            path: "Carbookinglists",
                            element: <Carbookinglists />,
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


        ]
    },
    {
        path: "admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
            
            {
                path: "signup",
                element: <Signup role="admin"/>,
            },
            {
                path: "login",
                element: <Login role="admin"/>,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "carDetails/:id",
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
                element: <ProtectedRoutes />,
              path:"user",
                children:
                    [
                        {
                            path: "carBookings",
                            element: <CarBookings />,
                        },
                        {
                            path: "Carbookinglists",
                            element: <Carbookinglists />,
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


        ]
    },

]);
