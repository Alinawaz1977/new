import React, { useContext } from 'react'
import { assets } from "../assets/assets"
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { DoctorContext } from '../Context/doctorContext'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl } from '../App'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, settoken } = useContext(DoctorContext)
  const [visible, setvisible] = useState(false)
  const [userDet, setuserDet] = useState('')
  const [loading, setLoading] = useState(false)
  const [userMenuVisible, setUserMenuVisible] = useState(false)
  
  const fetchUser = async () => {
    if (!token) {
      setuserDet('')
      return
    }
    
    try {
      setLoading(true)
      const response = await axios.post(backendUrl + "/api/user/find", {}, { headers: { token } })
      if (response.data.success) {
        setuserDet(response.data.user)
      } else {
        console.error("Failed to fetch user data:", response.data.message)
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchUser()
    } else {
      setuserDet('')
    }
  }, [token])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuVisible && !event.target.closest('.user-menu-container')) {
        setUserMenuVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuVisible])


  return (
    <>
      <nav className='flex items-center justify-between py-3' >
        <img onClick={() => navigate("/")} className='w-45 cursor-pointer ' src={assets.logo} alt="logoimage" />
        <ul className='flex gap-4 items-center' >
          <NavLink to={"/"} className='hidden md:block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200' >HOME</NavLink>
          <NavLink to={"/doctors"} className='hidden md:block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200' >ALL DOCTORS</NavLink>
          <NavLink to={"/contact"} className='hidden md:block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200' >CONTACT</NavLink>
          <NavLink to={"/about"} className='hidden md:block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200' >ABOUT</NavLink>
          <a target="_blank"
            rel="noopener noreferrer" 
            className='hidden md:flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105 border border-gray-200 hover:border-blue-300 px-3 py-2 rounded-lg hover:shadow-md' 
            href="https://doctor-admin-silk.vercel.app/"
          >
            <svg className="w-4 h-4 transition-transform duration-300 hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="relative">
              Admin Panel
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            </span>
          </a>
        </ul>
        {token ? <div className='user-menu-container group relative z-10' >
          <div 
            onClick={() => setUserMenuVisible(!userMenuVisible)}
            className='cursor-pointer'
          >
            {loading ? (
              <div className='w-10 h-10 rounded-full bg-gray-200 animate-pulse flex items-center justify-center'>
                <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
              </div>
            ) : (
              <img 
                loading='lazy' 
                className='w-10 rounded-full h-10 cursor-pointer object-cover border-2 border-gray-200 hover:border-blue-400 transition-colors' 
                src={userDet?.image || assets.upload_area} 
                alt="User profile" 
                onError={(e) => {
                  e.target.src = assets.upload_area
                }}
              />
            )}
          </div>
          <div className={`${userMenuVisible ? 'block' : 'hidden'} group-hover:block absolute transition-all ease-in-out dropdown-menu md:right-[-60px] right-0 pt-4`} >
            {
              token && <div className='flex flex-col w-48 bg-slate-100 px-5 py-3 text-gray-600 rounded-lg shadow-lg' >
                {userDet?.name && (
                  <div className='border-b border-gray-300 pb-2 mb-2'>
                    <p className='font-semibold text-gray-800 text-sm'>{userDet.name}</p>
                    <p className='text-xs text-gray-500'>{userDet.email}</p>
                  </div>
                )}
                <p onClick={() => { navigate("/myappointments"); setUserMenuVisible(false) }} className='cursor-pointer font-medium transition-all hover:text-black py-1' >My Appointments</p>
                <p onClick={() => { navigate("/profile"); setUserMenuVisible(false) }} className='cursor-pointer font-medium transition-all hover:text-black py-1' >Profile</p>
                <p onClick={() => { settoken(""); localStorage.removeItem("token"); navigate("/login"); setUserMenuVisible(false) }} className='cursor-pointer font-medium transition-all hover:text-black py-1 text-red-600' >Logout</p>
              </div>
            }
          </div>
        </div> : <button onClick={() => navigate("/login")} className=' hidden md:block cursor-pointer bg-blue-500 px-6 font-medium py-2 rounded-full text-white' >Create account</button>}

        <img onClick={() => setvisible(true)} className='w-6 cursor-pointer block md:hidden' src={assets.menu_icon} alt="menu-icon" />
      </nav>
      <div className={`top-0 z-10 absolute bottom-0 right-0 overflow-hidden transition-all  bg-white ${visible ? "w-full" : "w-0"}`} >
        <div>
          <button onClick={() => setvisible(false)} className='flex px-2.5 gap-1.5 my-3'> <img className='rotate-180' src={assets.arrow_icon} alt="" />Back</button>
          
          {/* Mobile User Menu */}
          {token && userDet && (
            <div className='border-b border-gray-300 px-4 py-3 bg-gray-50'>
              <div className='flex items-center gap-3 mb-3'>
                <img 
                  className='w-12 h-12 rounded-full object-cover border-2 border-gray-200' 
                  src={userDet?.image || assets.upload_area} 
                  alt="User profile" 
                  onError={(e) => {
                    e.target.src = assets.upload_area
                  }}
                />
                <div>
                  <p className='font-semibold text-gray-800'>{userDet.name}</p>
                  <p className='text-sm text-gray-500'>{userDet.email}</p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <button onClick={() => { navigate("/profile"); setvisible(false) }} className='text-left px-2 py-2 text-gray-700 hover:bg-gray-200 rounded'>Profile</button>
                <button onClick={() => { navigate("/myappointments"); setvisible(false) }} className='text-left px-2 py-2 text-gray-700 hover:bg-gray-200 rounded'>My Appointments</button>
                <button onClick={() => { settoken(""); localStorage.removeItem("token"); navigate("/login"); setvisible(false) }} className='text-left px-2 py-2 text-red-600 hover:bg-red-50 rounded'>Logout</button>
              </div>
            </div>
          )}
          
          <ul className='flex flex-col' >
            <NavLink onClick={() => setvisible(false)} to={"/"} className='border-t border-gray-200 px-4 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-200' >Home</NavLink>
            <NavLink onClick={() => setvisible(false)} to={"/doctors"} className='border-t border-gray-200 px-4 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-200' >All Doctors</NavLink>
            <NavLink onClick={() => setvisible(false)} to={"/contact"} className='border-t border-gray-200 px-4 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-200' >Contact</NavLink>
            <NavLink onClick={() => setvisible(false)} to={"/about"} className='border-t border-gray-200 px-4 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-200' >About</NavLink>
            <a 
              target="_blank"
              rel="noopener noreferrer" 
              onClick={() => setvisible(false)}
              className='border-t border-gray-200 px-4 py-3 text-left text-gray-700 hover:text-blue-600 font-medium flex items-center gap-3 transition-all duration-300 hover:bg-blue-50 rounded-lg mx-2' 
              href="http://localhost:5173"
            >
              <svg className="w-5 h-5 transition-transform duration-300 hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="relative">
                Admin Panel
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              </span>
            </a>
            {!token && (
              <button onClick={() => { navigate("/login"); setvisible(false) }} className='border-t border-gray-200 px-4 py-3 text-left text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'>Login / Sign Up</button>
            )}
          </ul>
        </div>
      </div>
      <div className=' h-[1px] w-full bg-gray-300' ></div>
    </>
  )
}

export default Navbar