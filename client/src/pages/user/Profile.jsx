import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const [profile, isLoading, error] = useFetch('/user/profile');
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="text-xl font-bold text-blue-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-xl font-bold text-red-600">{error.message || 'Error loading profile'}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="text-xl font-bold text-gray-600">No profile data available</div>
      </div>
    );
  }

  const userLogout = async () => {
    try {
      const response = await axiosInstance({ method: 'PUT', url: '/user/Logout' });
      navigate('/');
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 text-blue-900 dark:bg-base-100 dark:text-base-content flex items-center justify-center py-10">
      {/* Profile Card */}
      <div className="p-10 card w-full max-w-md bg-blue-100 text-blue-900 dark:bg-base-100 dark:text-base-content shadow-lg border border-blue-200 rounded-lg">
        {/* Profile Picture */}
        <div className="flex justify-center mt-6">
          <img
            src={profile.profilePic}
            alt="Profile Pic"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
          />
        </div>

        {/* Profile Details */}
        <div className="card-body p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">{profile.name.toUpperCase()}</h2>
          <p className="-600 mb-4">{profile.address.charAt(0).toUpperCase() + profile.address.slice(1).toLowerCase()}</p>

          <div className="space-y-3 text-left">
            <div className="flex items-center">
              <span className="font-medium text-blue-600 w-1/3">Email:</span>
              <span className="">{profile.email}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-blue-600 w-1/3">Phone:</span>
              <span className="">{profile.phone}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-blue-600 w-1/3">Address:</span>
              <span className="">{profile.address.charAt(0).toUpperCase() + profile.address.slice(1).toLowerCase()}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-blue-600 w-1/3">Status:</span>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  profile.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {profile.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-blue-600 w-1/3">Created:</span>
              <span className="">{new Date(profile.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-blue-600 w-1/3">Updated:</span>
              <span className="">{new Date(profile.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <button className="btn btn-error" onClick={userLogout}>Logout</button>
      </div>
    </div>
  );
};
