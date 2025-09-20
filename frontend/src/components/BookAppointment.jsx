import React from 'react'
import { assets } from '../assets/assets'

const BookAppointment = () => {
  return (
    <div className=' flex flex-col md:flex-row bg-[#5f6fff] w-full relative rounded-xl pt-10 my-28'  >
        {/*---------------------left------------------ */}
        <div className='flex px-20 md:ml-20 md:px-0 flex-col w-full md:w-1/2  justify-center' >
            <div className='text-xl  md:text-5xl  font-bold text-white  '  >
                <p>Book Appointment </p>
                <p>With 100+ Trusted Doctors</p>
            </div>
            <button className= 'hover:scale-105 transition-all duration-200 cursor-pointer text-gray-900 w-fit mt-4 bg-white rounded-full py-2 px-6 ' >Create account</button>
        </div>
        {/* -------------------------------------right---------------------------------- */}
        <div className='w-full items-center  flex justify-center md:w-1/2 ' >
            <img loading='lazy' className=' w-[250px] md:w-[350px] bottom-0 mt-3 mx-auto ' src={assets.appointment_img} alt="appointment-image" />
        </div>
    </div>
  )
}

export default BookAppointment