import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { DoctorContext } from '../Context/doctorContext'
import { useEffect,useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'  

const SpecialityDoctor = () => {
  const navigate=useNavigate()
    const {speciality}=useParams()
    const {doctors}=useContext(DoctorContext)
    const [specialDoctor, setspecialDoctor] = useState([])
    console.log(specialDoctor);
    

    const sd=()=>{
        const filtered= doctors.filter((doctor)=>doctor.speciality.toLowerCase()===speciality.toLowerCase())
        setspecialDoctor(filtered)
    }

    useEffect(() => {
      sd()
    }, [speciality,doctors])
    

  return (
    <>
      <p className='mt-5 text-gray-600 ' >Browse through the doctors specialist.</p>
    <div className='flex-col flex sm:flex-row md:gap-4' >
        <Sidebar/>
       <div className='flex justify-center gap-5 flex-wrap  mt-5  ' >
        {
          specialDoctor.map((doctor,index) => (
            <div onClick={()=>navigate(`/doctors/${doctor._id}`)} key={index} className='border hover:transform hover:translate-y-[-10px] transition-all duration-300 h-fit w-fit cursor-pointer rounded-md border-gray-300' >
              <div className=' rounded-md w-[240px] bg-[#eaefff]  h-[240px] ' >
                <img loading='lazy' className='w-[240px] h-[240px] object-cover ' src={doctor.image} alt="" />
              </div>
              <div className='ml-4' >
                <div className='flex items-center text-green-500 gap-3 mt-3' >
                  <p className='font-black text-lg' >.</p>
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

export default SpecialityDoctor