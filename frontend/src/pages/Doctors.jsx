import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DoctorContext } from '../Context/doctorContext'
import Sidebar from '../components/Sidebar'

const Doctors = () => {
  const navigate=useNavigate()
  const { doctors ,filter,setfilter} = useContext(DoctorContext)
  return (
    <>
    <p className='mt-5 text-gray-600 ' >Browse through the doctors specialist.</p>
      <button onClick={()=>setfilter(!filter)} className={`mt-4 sm:hidden px-4 py-1 ${filter?"bg-black":"bg-white"} ${filter?"text-white":"text-black"} border border-gray-300`} >FIlter</button>
    <div className='flex gap-5  flex-col sm:flex-row ' >
      <div className={`${filter?"block":"hidden"} sm:block `} >
      <Sidebar/>
      </div>
      <div className='flex h-[80vh] justify-center sm:justify-normal overflow-scroll gap-5 mt-5 flex-wrap ' >
        {
          doctors.map((doctor) => (
            <div key={doctor._id} onClick={()=>navigate(`/doctors/${doctor._id}`)} className='border hover:transform hover:translate-y-[-10px] transition-all duration-300 h-fit  w-fit cursor-pointer rounded-md border-gray-300' >
              <div className=' rounded-md w-[240px] bg-[#eaefff] transition-all duration-500  h-[240px] ' >
                <img loading='lazy' className='w-[240px] h-[240px] object-cover ' src={doctor.image} alt="" />
              </div>
              <div className='ml-4' >
                <div className='flex items-center text-green-500 gap-3 mt-3' >
                  <p className='font-black bg-green-500 h-2 w-2 rounded-full' ></p>
                  <p>available</p>
                </div>
                <p className='text-xl' >{doctor.name}</p>
                <p className='pb-2 text-gray-400 text-sm' >{doctor.speciality}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
        </>
  )
}

export default Doctors