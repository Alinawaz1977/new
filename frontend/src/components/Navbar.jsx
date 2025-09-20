import React from 'react'
import { assets } from "../assets/assets"
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const [visible, setvisible] = useState(false)
  const navigate=useNavigate()
  return (
    <>
    <nav className='flex items-center justify-between py-3' >
      <img onClick={()=>navigate("/")} className='w-45 cursor-pointer ' src={assets.logo} alt="logoimage" />
      <ul className='flex gap-3' >
        <NavLink to={"/"} className='hidden md:block' >HOME</NavLink>
        <NavLink to={"/doctors"} className='hidden md:block' >ALL DOCTORS</NavLink>
        <NavLink to={"/contact"} className='hidden md:block' >CONTACT</NavLink>
        <NavLink to={"/about"} className='hidden md:block' >ABOUT</NavLink>
      </ul>
      <button className=' hidden md:block cursor-pointer bg-blue-500 px-6 font-medium py-2 rounded-full text-white' >Create account</button>
      <img onClick={()=>setvisible(true)} className='w-6  block md:hidden ' src={assets.menu_icon} alt="menu-icon" />
    </nav>
    <div  className={`top-0 z-10 absolute bottom-0 left-0 overflow-hidden transition-all  bg-white ${visible?"w-full":"w-0"}`} >
      <div>
        <button onClick={()=>setvisible(false)} className='flex px-2.5 gap-1.5 my-3'> <img className='rotate-180' src={assets.arrow_icon} alt="" />Back</button>
        <ul className='flex flex-col ' >
          <NavLink onClick={()=>setvisible(false)} to={"/"} className='border-t border-gray-300 px-2 py-2' >Home</NavLink>
          <NavLink onClick={()=>setvisible(false)} to={"/doctors"} className='border-t border-gray-300 px-2 py-2' >Doctors</NavLink>
          <NavLink onClick={()=>setvisible(false)} to={"/contact"} className='border-t border-gray-300 px-2 py-2' >Contact</NavLink>
          <NavLink onClick={()=>setvisible(false)} to={"/about"} className='border-t border-gray-300 px-2 py-2' >About</NavLink>
        </ul>
      </div>
    </div>
    <div className=' h-[1px] w-full bg-gray-300' ></div>
    </>
  )
}

export default Navbar