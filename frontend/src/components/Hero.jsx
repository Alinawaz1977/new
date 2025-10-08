import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { DoctorContext } from '../Context/doctorContext'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate=useNavigate()
    const { token } = useContext(DoctorContext)
    return (
        <div className='flex flex-col  md:flex-row  md:h-[60vh] gap-80 md:gap-0 relative rounded-md mt-4 w-full bg-[#5f6fff] ' >
            {/* ---------------------left------------------------ */}
            <div className='w-full  pt-6 md:justify-center  text-center md:text-start md:pl-16 flex flex-col md:w-1/2  h-full '   >
                <div className='text-white inter text-3xl md:text-5xl flex flex-col gap-3 font-bold' >
                    <p>Book Appointment </p>
                    <p className='' >With Trusted Doctors </p>
                </div>
                <div className='flex flex-col md:flex-row text-center sm:text-start justify-center  items-center ' >
                    <img loading='lazy' className='w-16 h-16 object-contain ' src={assets.group_profiles} alt="group-pic" />
                    <p className='text-sm  px-10 md:px-2  min-w-98 text-white ' >Simply browse through our extensive list of trusted doctors,
                        schedule your appointment hassle-free.</p>
                </div>
                {token==='' ? <button onClick={() => navigate("/login")} className=' md:mx-0 transition-all duration-200 hover:scale-105 flex mx-auto mt-4 w-fit  items-center gap-2 bg-white rounded-full py-3 px-6 cursor-pointer ' >Create account</button> : <button onClick={() => {navigate("/doctors");scrollTo(0,0)}} className=' md:mx-0 transition-all duration-200 hover:scale-105 flex mx-auto mt-4 w-fit  items-center gap-2 bg-white rounded-full py-3 px-6 cursor-pointer '  >Book appointment <span><img src={assets.arrow_icon} alt="" /></span> </button>}
            </div>
            {/* ---------------------right------------------------- */}
            <div className='w-full md:w-1/2 flex lg:justify-center ' >
                <img className='w-[450px] absolute 2xl:w-[700px] bottom-0' src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Hero