import React, { useContext } from 'react'
import { assets } from "../assets/assets"
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { DoctorContext } from '../Context/doctorContext'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl } from '../App'
import { Link} from 'react-router-dom'

const Navbar = () => {
  const navigate=useNavigate()
  const { token,settoken } = useContext(DoctorContext)
  const [visible, setvisible] = useState(false)
  const [userDet, setuserDet] = useState('')
  const fetchUser = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/user/find", {}, { headers: { token } })
      if (response.data.success) {
        setuserDet(response.data.user)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])


  return (
    <>
      <nav className='flex items-center justify-between py-3' >
        <img onClick={() => navigate("/")} className='w-45 cursor-pointer ' src={assets.logo} alt="logoimage" />
        <ul className='flex gap-3' >
          <NavLink to={"/"} className='hidden md:block' >HOME</NavLink>
          <NavLink to={"/doctors"} className='hidden md:block' >ALL DOCTORS</NavLink>
          <NavLink to={"/contact"} className='hidden md:block' >CONTACT</NavLink>
          <NavLink to={"/about"} className='hidden md:block' >ABOUT</NavLink>
        </ul>
        {token?<div className='group relative z-10' >
                    <Link to={"/profile"} ><img c loading='lazy' className='w-10 rounded-full h-10 cursor-pointer ' src={userDet?.image} alt="" /></Link>
                    <div className='group-hover:block hidden absolute transition-all ease-in-out dropdown-menu  md:right-[-60px] right-0 pt-4' >
                        {
                            token && <div className='flex flex-col w-36 bg-slate-100 px-5 py-3 text-gray-600 ' >
                                <p onClick={()=>navigate("/myappointments")} className='cursor-pointer font-medium transition-all hover:text-black' >My appointments</p>
                                <p onClick={()=>navigate("/myappointments")} className='cursor-pointer font-medium transition-all hover:text-black' >my appointments</p>
                                <p onClick={()=>settoken("")}  className='cursor-pointer font-medium transition-all hover:text-black' >Logout</p>
                            </div>
                        }
                    </div>
                </div>:<button onClick={() => navigate("/login")} className=' hidden md:block cursor-pointer bg-blue-500 px-6 font-medium py-2 rounded-full text-white' >Create account</button>}
        
        <img onClick={() => setvisible(true)} className='w-6  block md:hidden ' src={assets.menu_icon} alt="menu-icon" />
      </nav>
      <div className={`top-0 z-10 absolute bottom-0 right-0 overflow-hidden transition-all  bg-white ${visible ? "w-full" : "w-0"}`} >
        <div>
          <button onClick={() => setvisible(false)} className='flex px-2.5 gap-1.5 my-3'> <img className='rotate-180' src={assets.arrow_icon} alt="" />Back</button>
          <ul className='flex flex-col ' >
            <NavLink onClick={() => setvisible(false)} to={"/"} className='border-t border-gray-300 px-2 py-2' >Home</NavLink>
            <NavLink onClick={() => setvisible(false)} to={"/doctors"} className='border-t border-gray-300 px-2 py-2' >Doctors</NavLink>
            <NavLink onClick={() => setvisible(false)} to={"/contact"} className='border-t border-gray-300 px-2 py-2' >Contact</NavLink>
            <NavLink onClick={() => setvisible(false)} to={"/about"} className='border-t border-gray-300 px-2 py-2' >About</NavLink>
          </ul>
        </div>
      </div>
      <div className=' h-[1px] w-full bg-gray-300' ></div>
    </>
  )
}

export default Navbar