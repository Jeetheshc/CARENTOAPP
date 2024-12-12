import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get("/api/admin/profile"); // Adjust the endpoint if necessary
        setAdmin(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  if (isLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            src={admin.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{admin.name}</h1>
            <p className="text-gray-600">{admin.email}</p>
            <p className="text-gray-600">{admin.phone}</p>
            <p className="text-gray-600">Status: {admin.isActive ? "Active" : "Inactive"}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Name</span>
              <span className="text-gray-800">{admin.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email</span>
              <span className="text-gray-800">{admin.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone</span>
              <span className="text-gray-800">{admin.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="text-gray-800">{admin.isActive ? "Active" : "Inactive"}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
