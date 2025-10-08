import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { DoctorContext } from '../Context/doctorContext'
import { useNavigate } from 'react-router-dom'


const BookAppointment = () => {
  const navigate = useNavigate()
  const { token } = useContext(DoctorContext)
  return (
    <div className=' flex flex-col md:flex-row bg-[#5f6fff] w-full relative rounded-xl pt-10 my-28'  >
      {/*---------------------left------------------ */}
      <div className='flex px-20 md:ml-20 md:px-0 flex-col w-full md:w-1/2  justify-center' >
        <div className='text-xl  md:text-5xl  font-bold text-white  '  >
          <p>Book Appointment </p>
          <p>With 100+ Trusted Doctors</p>
        </div>
        {token==='' ? <button onClick={() => navigate("/login")} className=' md:mx-0 transition-all duration-200 hover:scale-105 flex mx-auto mt-4 w-fit  items-center gap-2 bg-white rounded-full py-3 px-6 cursor-pointer ' >Create account</button> : <button onClick={() => {navigate("/doctors");scrollTo(0,0)}} className=' md:mx-0 transition-all duration-200 hover:scale-105 flex mx-auto mt-4 w-fit  items-center gap-2 bg-white rounded-full py-3 px-6 cursor-pointer '  >Book appointment <span><img src={assets.arrow_icon} alt="" /></span> </button>}
      </div>
      {/* -------------------------------------right---------------------------------- */}
      <div className='w-full items-center  flex justify-center md:w-1/2 ' >
        <img loading='lazy' className=' w-[250px] md:w-[350px] bottom-0 mt-3 mx-auto ' src={assets.appointment_img} alt="appointment-image" />
      </div>
    </div>
  )
}

export default BookAppointment