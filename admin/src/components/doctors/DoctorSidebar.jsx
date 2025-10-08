import { assets } from '../../assets/assets'
import { Link,NavLink } from 'react-router-dom'
import React from 'react'
import { AppContext } from '../../Context/AppContext'
import { useContext } from 'react'
const DoctorSidebar = () => {

    const { dtoken } = useContext(AppContext)
    return dtoken && (
        <div className='w-[20vw] hidden md:block border-r shrink-0 border-gray-200 min-h-screen bg-white ' >
            <NavLink className={'flex h-10 justify-between py-1.5 mt-4 pl-5 w-full '} to={"/doctor-dashboard"} >
                <div className='flex gap-3 items-center ' >
                    <img className='w-5' src={assets.home_icon} alt="home" />
                    <p className='   ' >Dashboard</p>
                </div>
                <div className='h-7 w-[4px] bg-blue-700 hidden line ' ></div>
            </NavLink>
            <NavLink className={'flex h-10 justify-between py-1.5 mt-4 pl-5 w-full '} to={"/doctor-appointments"} >
                <div className='flex gap-3 items-center ' >
                    <img className='w-5' src={assets.appointment_icon} alt="home" />
                    <p className='   ' >Appointments</p>
                </div>
                <div className='h-7 w-[4px] bg-blue-700 hidden line ' ></div>
            </NavLink>
            <NavLink className={'flex h-10 justify-between py-1.5 mt-4 pl-5 w-full '} to={"/doctor/profile"} >
                <div className='flex gap-3 items-center ' >
                    <img className='w-5' src={assets.add_icon} alt="home" />
                    <p className='   ' >Profile</p>
                </div>
                <div className='h-7 w-[4px] bg-blue-700 hidden line ' ></div>
            </NavLink>
        </div>
    )

}

export default DoctorSidebar






