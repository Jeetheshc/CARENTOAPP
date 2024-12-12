import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export const EditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, isLoadingData, errorData] = useFetch(`/car/${id}`);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (data) setFormData({ ...data });
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("ownerDetails")) {
            const key = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                ownerDetails: { ...prev.ownerDetails, [key]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            carImage: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "ownerDetails") {
                    form.append(key, JSON.stringify(value));
                } else if (key === "carImage" && value instanceof File) {
                    form.append(key, value);
                } else {
                    form.append(key, value);
                }
            });

            const response = await fetch(`/car/edit/${id}`, {
                method: "PUT",
                body: form,
                headers: { Accept: "application/json" },
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to update car details");

            alert(result.message);
            navigate(`/admin/view-car/${id}`);
        } catch (err) {
            alert(err.message || "Failed to update car details");
        }
    };

    if (isLoadingData) return <div>Loading...</div>;
    if (errorData) return <div className="text-red-600">{errorData.message}</div>;
    if (!formData) return <div>No car data available to edit.</div>;

    return (
        <div className="container mx-auto p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen">
            <h1 className="text-5xl font-bold text-center text-indigo-800 mb-10">Edit Car</h1>
            <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6">
                        {formData.carImage && (
                            <img
                                src={
                                    typeof formData.carImage === "string"
                                        ? formData.carImage
                                        : URL.createObjectURL(formData.carImage)
                                }
                                alt="Car"
                                className="w-full h-64 object-cover rounded-md mb-6"
                            />
                        )}
                        <label className="block text-gray-700 font-medium mb-2">Upload New Image</label>
                        <input
                            type="file"
                            name="carImage"
                            onChange={handleImageUpload}
                            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                        />
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-medium">Brand</label>
                                    <input
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Brand"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Model</label>
                                    <input
                                        name="model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Model"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Year</label>
                                    <input
                                        name="year"
                                        type="number"
                                        value={formData.year}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Year"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Price Per Day</label>
                                    <input
                                        name="pricePerDay"
                                        type="number"
                                        value={formData.pricePerDay}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Price Per Day"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Car Type</label>
                                    <select
                                        name="carType"
                                        value={formData.carType}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="SUV">SUV</option>
                                        <option value="Sedan">Sedan</option>
                                        <option value="Hatchback">Hatchback</option>
                                        <option value="Convertible">Convertible</option>
                                        <option value="Coupe">Coupe</option>
                                        <option value="Minivan">Minivan</option>
                                        <option value="Truck">Truck</option>
                                        <option value="Wagon">Wagon</option>
                                        <option value="Crossover">Crossover</option>
                                        <option value="Electric">Electric</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="Luxury">Luxury</option>
                                        <option value="Sports Car">Sports Car</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Pickup">Pickup</option>
                                        <option value="Compact">Compact</option>
                                        <option value="Off-Road">Off-Road</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Features</label>
                                    <textarea
                                        name="features"
                                        value={formData.features?.join(",")}
                                        onChange={(e) =>
                                            handleChange({
                                                target: { name: "features", value: e.target.value.split(",") },
                                            })
                                        }
                                        className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Features (comma-separated)"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Location</label>
                                    <input
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Location"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Car Number</label>
                                    <input
                                        name="carNumber"
                                        value={formData.carNumber}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Car Number"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 shadow-md transition duration-300"
                            >
                                Update Car
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
