import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {FaSearch} from "react-icons/fa";


const Header = () => {
  const {user, isAuthenticated} = useSelector((state)=> state.auth);

  return (
    <header className='bg-slate-200 shadow-md'>
    <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Sahand</span>
            <span className='text-slate-700'>Estate</span>
        </h1>
        </Link>
        <div className="bg-slate-100 flex items-center p-3 rounded-md">
            <input className='border-none outline-none bg-transparent w-24 sm:w-64' type="text" placeholder='Search...' />
            <span className=''><FaSearch/></span>
        </div>
        <ul className='flex gap-10 items-center'>
            <Link  to="/">
            <li className='hidden sm:inline text-lg font-medium transition duration-2500 ease-out hover:text-blue-900'>Home</li>
            </Link>
            <Link to="/about">
            <li className='hidden sm:inline text-lg font-medium transition duration-2500 ease-out hover:text-blue-900'>About</li>
            </Link>
            <Link to="/profile">
           {
            isAuthenticated ? (
              <div className="w-10 flex items-center">
                <img className='rounded-3xl' src={user?.avatar} alt="profile" />
              </div>
            ) :
            ( <li className='text-lg font-medium transition duration-2500 ease-out hover:text-blue-900'>Login</li>)
           }
            </Link>
        </ul>
    </div>
    </header>
  )
}

export default Header
