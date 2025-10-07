import React, { useContext } from 'react'
import { DoctorContext } from '../Context/doctorContext'
import { Title } from './Title'
import { Link, useNavigate } from 'react-router-dom'

const TopDoctors = () => {

  const { doctors } = useContext(DoctorContext)
  const navigate=useNavigate()

  return (
    <>
    <div className='flex flex-col gap-3 items-center' >
      <Title text1={"Top Doctors to Book"} />
      <p className='text-center' >Simply browse through our extensive list of trusted doctors.
      </p>
    </div>
      <div className='flex justify-center gap-4 mt-10 flex-wrap ' >
        {
          doctors.map((doctor) => (
            <Link to={`/doctors/${doctor._id}`} >
            <div  className='border w-fit cursor-pointer rounded-md border-gray-300 hover:transform hover:translate-y-[-10px] transition-all duration-300 ' >
              <div className=' rounded-md w-[210px] bg-[#eaefff] transition-all duration-500  h-[220px] ' >
                <img loading='lazy' className='w-[210px] h-[220px] object-cover ' src={doctor.image} alt="" />
              </div>
              <div className='ml-4' >
                <div className='flex items-center  text-green-500 gap-3 mt-3' >
                  <p className='font-black h-2 w-2 rounded-full bg-green-500' ></p>
                  <p>available</p>
                </div>
                <p className='text-xl' >{doctor.name}</p>
                <p className='pb-2 text-gray-600 text-sm' >{doctor.speciality}</p>
              </div>
            </div>
            </Link>
          ))
        }
      </div>
      <div className='flex justify-center items-center' >
      <button onClick={()=>navigate("/doctors")} className='py-2 blue rounded-full mt-15  text-center px-10 bg-[#eaefff] cursor-pointer  ' >more</button>
      </div>
    </>
  )
}

export default TopDoctors