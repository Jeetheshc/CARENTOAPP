import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DarkMode } from '../shared/Darkmode'
import { axiosInstance } from '../../config/axiosInstance'


export const AdminHeader = () => {
    const navigate = useNavigate()
    const adminLogout =async()=>{
        try {
          const response = await axiosInstance ({ method: "PUT", url:'/admin/Logout'});
        navigate('/admin/login')
      
        } catch (error) {
          
        }
      }
  return (
    <div className='bg-blue-100 text-blue-900 dark:bg-base-100 dark:text-base-content p-4 flex font-semibold py-4 px-4  items-center justify-between'>
    <Link to={"/admin"}>
        <div>
            <img className='rounded-md shadow-md' src="src/assets/logo.png" alt="logo" />
        </div>
    </Link>
    <nav>
        <h1>Admin Logged in</h1>
    </nav>

    <div>
          <button
            onClick={() => navigate('/admin/profile')}
            className="bg-white mr-5 text-sky-700 font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-100 transition duration-300"
          >
            Profile
          </button>
          <button className='bg-white text-red-600 font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-100 transition duration-300' onClick={adminLogout}>Logout</button>
        </div>

    <DarkMode />
</div>
  )
}
