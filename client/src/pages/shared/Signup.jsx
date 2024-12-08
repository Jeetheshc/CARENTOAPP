// signup.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const Signup = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });

            const response = await axiosInstance({
                method: "POST",
                url: "/user/signup",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Signup successful");
            navigate("/user/profile");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Signup failed");
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
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-green-600 hover:bg-green-700 text-white border-none transition-transform duration-300 hover:scale-105">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
