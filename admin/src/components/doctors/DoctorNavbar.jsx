import React from 'react'
import { assets } from '../../assets/assets'
import { Links,NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
const DoctorNavbar = () => {
    const {dtoken}=useContext(AppContext)
    return dtoken && (
        <div className='flex justify-between border-b fixed 
            z-50 border-gray-200 items-center px-10  shadow-lg w-full bg-white' >
            <img className='w-50 my-2 ' src={assets.admin_logo} alt="admin_logo" />
            <button onClick={() => settoken('')} className='py-1.5 px-7 text-white rounded-full font-medium bg-[#5f6fff] cursor-pointer ' >Logout</button>
        </div>
    )
}

export default DoctorNavbar