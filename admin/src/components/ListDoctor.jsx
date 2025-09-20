import React from 'react'
import axios from "axios"
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
const ListDoctor = () => {

    const [doctors, setdoctors] = useState([])
    console.log(doctors);



    const listDoctors = async () => {

        try {
            const response = await axios.get(backendUrl + "/api/doctor/list")
            if (response.data.success) {
                setdoctors(response.data.doctors)
            }
            else {
                toast.error(response.data.error)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        listDoctors()
    }, [])



    return (
        <div className='overflow-scroll' >
            <p className='text-lg font-medium my-4 flex gap-3 ' >All Doctors</p>
            <div className='flex gap-3 flex-wrap' >
            {
                doctors.map((doctor) => (
                    <div className='border-2 cursor-pointer rounded-xl border-gray-300' >
                        <div className='h-[210px] hover:bg-blue-700 transition-all duration-500 rounded-xl bg-slate-200 w-[220px]  ' >
                            <img className='h-[210px] w-[220px] object-cover' src={doctor.image} alt="doctor image" />
                        </div>
                        <div className='ml-3 mt-4' >
                            <p className='text-xl mt-2.5' >{doctor.name}</p>
                            <p className='text-sm text-gray-500' >{doctor.speciality} </p>
                            <div className='flex mb-3 gap-2' >
                                <input checked={doctor.available} type="checkbox" />
                                <p className='' >Available</p>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default ListDoctor