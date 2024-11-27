import React from 'react';

function Signup() {
  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 bg-sky-700 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign Up</h5>
          
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-teal-100 dark:text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-teal-100 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-teal-100 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-teal-100 dark:text-white"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="123 Main St"
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-teal-100 dark:text-white"
            >
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="123-456-7890"
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          {/* Profile Picture Field */}
          <div>
            <label
              htmlFor="profilePic"
              className="block mb-2 text-sm font-medium text-teal-100 dark:text-white"
            >
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePic"
              id="profilePic"
              accept="image/*"
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Account
          </button>

          {/* Login Link */}
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-blue-700 hover:underline dark:text-gray-200"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
