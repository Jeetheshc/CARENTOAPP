import { createBrowserRouter } from "react-router-dom";
import { CarBookings } from "../pages/user/CarBookings";
import { CarDetails } from "../pages/user/CarDetails";
import { Cars } from "../pages/user/Cars";
import { Contact } from "../pages/user/Contact";
import { Home } from "../pages/user/Home";
import { Profile } from "../pages/user/Profile";
import { Profilechangepassword } from "../pages/user/Profilechangepassword";
import { ProfileChangePhoto } from "../pages/user/ProfileChangePhoto";
import { ProfileDeactivate } from "../pages/user/ProfileDeactivate";
import { UserLayout } from "../layout/UserLayout";
import { Signup } from "../pages/shared/Signup";
import { Login } from "../pages/shared/Login";
import ErrorPage from "../pages/shared/ErrorPage";
import About from "../pages/user/About";
import { AdminProtectedRoutes, ProtectedRoutes } from "./ProtectedRoutes";
import { AdminLayout } from "../layout/AdminLayout";
import { Carbookinglists } from "../pages/user/Carbookinglists";
import { CarbookingDetails } from "../pages/user/CarbookingDetails";
import { AdminHome } from "../pages/admin/AdminHome";
import { Carlist } from "../pages/admin/Carlist";
import { Addnewcar } from "../pages/admin/Addnewcar";
import { CarDetailpage } from "../pages/admin/CarDetailpage";

import { EditCar } from "../pages/admin/EditCar";
import { Userlist } from "../pages/admin/Userlist";
import { Userdetailpage } from "../pages/admin/Userdetailpage";
import { Edituser } from "../pages/admin/Edituser";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { Adminbooking } from "../pages/admin/Adminbooking";





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
                path: "user",
                children:
                    [

                        {
                            path: "Carbookinglists",
                            element: <Carbookinglists />,
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
        path: "admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/admin",
                element: <AdminHome />,
            },
            {
                path: "login",
                element: <Login role="admin" />,
            },
            {
                path: "carslist",
                element: <Carlist />,
            },
            {
                path: "addcars",
                element: <Addnewcar />,
            },
            {
                path: "view-car/:id",
                element: <CarDetailpage />,
            },
            {
                path: "edit-car/:id",
                element: <EditCar />,
            },
            {
                path: "userlist",
                element: <Userlist />,
            },
            {
                path: "view-user/:id",
                element: <Userdetailpage />,
            },
            {
                path: "edit-user/:id",
                element: <Edituser />,
            },
            {
                path:"profile/:id",
                element:<AdminProfile/>,
            },
            {
                path:"bookings",
                element:<Adminbooking/>,
            },
            {
                element: <AdminProtectedRoutes />,
                path: "admin",
                children:
                    [
                        {
                            path: "adminhome",
                            element: <AdminHome />,
                        },

                    ]

            },


        ]
    },

]);
