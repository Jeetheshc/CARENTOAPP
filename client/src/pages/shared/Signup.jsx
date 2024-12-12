import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const Signup = ({ role = "user" }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    // Configure role-specific routes
    const user = {
        role: "user",
        signup_route: "/user/signup",
        profile_route: "/user/profile",
    };

    if (role === "provider") {
        user.role = "provider";
        user.signup_route = "/provider/signup";
        user.profile_route = "/provider/profile";
    }

    if (role === "admin") {
        user.role = "admin";
        user.signup_route = "/admin/signup";
        user.profile_route = "/admin/profile";
    }

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            // Append non-file fields
            Object.keys(data).forEach((key) => {
                if (key !== "profilePic") {
                    formData.append(key, data[key]);
                }
            });

            // Append the profile picture file
            if (data.profilePic && data.profilePic[0]) {
                formData.append("profilePic", data.profilePic[0]);
            }

            // API call for signup
            const response = await axiosInstance({
                method: "POST",
                url: user.signup_route,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Signup successful!");
            navigate(user.profile_route);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Signup failed. Please try again.");
        }
    };

    return (
        <div className="hero bg-green-50 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-green-700 mb-4 transition-transform duration-300 hover:scale-105">
                        Sign Up Now!
                    </h1>
                </div>
                <div className="card bg-white w-full max-w-sm shrink-0 shadow-lg border border-green-200">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600 font-medium">Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name")}
                                placeholder="Enter your name"
                                className="input input-bordered border-green-300 focus:ring focus:ring-green-200 focus:border-green-500"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600 font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="Enter your email"
                                className="input input-bordered border-green-300 focus:ring focus:ring-green-200 focus:border-green-500"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600 font-medium">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password")}
                                placeholder="Enter your password"
                                className="input input-bordered border-green-300 focus:ring focus:ring-green-200 focus:border-green-500"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600 font-medium">Phone</span>
                            </label>
                            <input
                                type="text"
                                {...register("phone")}
                                placeholder="Enter your phone number"
                                className="input input-bordered border-green-300 focus:ring focus:ring-green-200 focus:border-green-500"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600 font-medium">Address</span>
                            </label>
                            <input
                                type="text"
                                {...register("address")}
                                placeholder="Enter your address"
                                className="input input-bordered border-green-300 focus:ring focus:ring-green-200 focus:border-green-500"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-green-600 font-medium">Profile Picture</span>
                            </label>
                            <input
                                type="file"
                                {...register("profilePic")}
                                className="file-input file-input-bordered file-input-green-500 w-full"
                                accept="image/*"
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-green-600 hover:bg-green-700 text-white border-none transition-transform duration-300 hover:scale-105">
                                Sign Up
                            </button>
                        </div>
                        <label className="label">
                            <Link to="/login" className="label-text-alt link link-hover text-green-600">
                                Already have an account? Login here.
                            </Link>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};
