import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DarkMode } from '../shared/Darkmode'

function Header() {
    const navigate = useNavigate()
    return (
        <div className='bg-blue-100 text-blue-900 dark:bg-base-100 dark:text-base-content p-4 flex font-semibold py-4 px-4  items-center justify-between'>
            <Link to={"/"}>CARENTO</Link>
            <nav>
                <ul className='flex gap-5 px-4'>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/about"}>About</Link>
                   
                    <Link to={"/contact"}>Contact Us</Link>
                   
                </ul>
            </nav>

            <div className='flex items-center space-x-4'>
                <button onClick={()=>navigate('/login')}className='bg-white text-blue-600 font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-100 transition duration-300'>Login</button>
                <button onClick={()=>navigate('/signup')} className='bg-white text-blue-600 font-semibold px-4 py-2 rounded-md shadow-md hover:bg-blue-100 transition duration-300'>Signup</button>
            </div>

            <DarkMode/>
        </div>
    )
}

export default Header