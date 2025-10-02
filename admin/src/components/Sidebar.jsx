import React from 'react'
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom"
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

const Sidebar = () => {
  const {token}=useContext(AppContext)
  const navigate = useNavigate()
  return (
    <>
      {token &&
        <div className='w-[20vw]  border-r shrink-0 border-gray-200 min-h-screen bg-white ' >
          <NavLink className={'flex h-10 justify-between py-1.5 mt-4 pl-5 w-full '} to={"/dashboard"} >
            <div className='flex gap-3 items-center ' >
              <img className='w-5' src={assets.home_icon} alt="home" />
              <p className='   ' >Dashboard</p>
            </div>
            <div className='h-7 w-[4px] bg-blue-700 hidden line ' ></div>
          </NavLink>
          <NavLink className={'flex h-10 justify-between py-1.5 mt-4 pl-5 w-full '} to={"/appointments"} >
            <div className='flex gap-3 items-center ' >
              <img className='w-5' src={assets.appointment_icon} alt="home" />
              <p className='   ' >Appointments</p>
            </div>
            <div className='h-7 w-[4px] bg-blue-700 hidden line ' ></div>
          </NavLink>
          <NavLink className={'flex h-10 justify-between py-1.5 mt-4 pl-5 w-full '} to={"/add"} >
            <div className='flex gap-3 items-center ' >
              <img className='w-5' src={assets.add_icon} alt="home" />
              <p className='   ' >Add Doctor</p>
            </div>
            <div className='h-7 w-[4px] bg-blue-700 hidden line ' ></div>
          </NavLink>
          <NavLink className={'flex h-10 justify-between py-1.5 mt-4 pl-5 w-full '} to={"/listdoctor"} >
            <div className='flex gap-3 items-center ' >
              <img className='w-5' src={assets.add_icon} alt="home" />
              <p className='   ' >Doctor List</p>
            </div>
            <div className='h-7 w-[4px] bg-blue-700 hidden line ' ></div>
          </NavLink>
          <NavLink className={'flex h-10 justify-between py-1.5 mt-4 pl-5 w-full '} to={"/patient"} >
            <div className='flex gap-3 items-center ' >
              <img className='w-5' src={assets.list_icon} alt="home" />
              <p className='   ' >Patient</p>
            </div>
            <div className='h-7 w-[4px] bg-blue-700 hidden line ' ></div>
          </NavLink>
        </div>
      }
    </>
  )
}

export default Sidebar