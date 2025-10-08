import React from 'react'
import { Title } from './Title'
import { assets, specialityData } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Speciality = () => {
    return (
        <>
            <div className=' ' >

                <div className='text-center  ' >
                    <Title text1={"Find by Speciality"} />
                    <p className=' mt-3 text-gray-500 ' >Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
                </div>
                <div className='grid grid-cols-[140px_140px] sm:grid-cols-[100px_110px_100px_100px_110px_100px] gap-2.5 md:flex-row text-center justify-center  mt-15  ' >
                    {
                        specialityData.map((item,index) => (
                            <NavLink key={index} to={`/doctors/category/${item.speciality}`} className='flex flex-col items-center ' >
                                <img className='w-25 hover:-translate-y-2 duration-400 cursor-pointer transition-all ' src={item.image} alt="" />
                                <p className=' mt-3 text-sm text-gray-600' >{item.speciality}</p>
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Speciality