import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../Context/doctorContext'

const Sidebar = () => {
    const {filter,setfilter}=useContext(DoctorContext)
    
    return (
        <>
        <div  > 
        <div className=' h-fit w-full  items-center md:items-start md:h-screen md:w-[16vw]  shrink-0 flex flex-col gap-4 mt-5' >
            <NavLink className={` rounded-md w-full border border-gray-300  px-3 py-2`} to={"/doctors/Generalphysician"} >
                General physician
            </NavLink>
            <NavLink className={` rounded-md w-full border border-gray-300  px-3 py-2`} to={"/doctors/Gynecologist"} >
                Gynecologist
            </NavLink>
            <NavLink className={` rounded-md w-full border border-gray-300  px-3 py-2`} to={"/doctors/Dermatologist"} >
                Dermatologist
            </NavLink>
            <NavLink className={` rounded-md w-full border border-gray-300  px-3 py-2`} to={"/doctors/Pediatricians"} >
                Pediatricians
            </NavLink>
            <NavLink className={` rounded-md w-full border border-gray-300  px-3 py-2`} to={"/doctors/Neurologist"} >
                Neurologist
            </NavLink>
            <NavLink className={` rounded-md w-full border border-gray-300  px-3 py-2`} to={"/doctors/Gastroenterologist"} >
                Gastroenterologist
            </NavLink>
        </div>
        </div>
        </>
    )
}

export default Sidebar