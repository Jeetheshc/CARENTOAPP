import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DarkMode } from '../shared/Darkmode';

function UserHeader() {
  const navigate = useNavigate();

  return (
    <div className=" w-full bg-base-100 text-base-content shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to={"/"}>
          <div>
            <img className='rounded-md shadow-md' src="src/assets/logo.png" alt="logo" />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="hover:text-blue-300 transition">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-300 transition">About</Link>
            </li>
            <li>
              <Link to="/cars" className="hover:text-blue-300 transition">Cars</Link>
            </li>
            <li>
              <Link to="/carbookinglist" className="hover:text-blue-300 transition">Bookings</Link>
            </li>
          </ul>
        </nav>

        {/* Profile Button */}
        <div>
          <button
            onClick={() => navigate('user/profile')}
            className="bg-white text-sky-700 font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-100 transition duration-300"
          >
            Profile
          </button>
        </div>
        <DarkMode/>
      </div>
      
    </div>
  );
}

export default UserHeader;
