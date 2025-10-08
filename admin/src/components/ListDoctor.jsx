import React, { useContext } from 'react'
import axios from "axios"
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { AppContext } from '../Context/AppContext'
const ListDoctor = () => {

    const { doctors, token } = useContext(AppContext)
    const [availibility, setavailibility] = useState(true)
    console.log(availibility);


    const toogleAvailibility = async (doctorid) => {
        try {
            const response = await axios.post(backendUrl + "/api/admin/available", { doctorid,availibility }, { headers: { token } })
            if(response.data.success){
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    return (
        <>
            {token &&
                <div className=' mx-2 overflow-scroll' >
                    <p className='text-lg font-medium my-4 flex gap-3 ' >All Doctors</p>
                    <div className='flex gap-3 flex-wrap' >
                        {
                            doctors?.map((doctor) => (
                                <div className='border-2 cursor-pointer rounded-xl border-gray-300' >
                                    <div className='h-[210px] hover:bg-blue-700 transition-all duration-500 rounded-xl bg-slate-200 w-[220px]  ' >
                                        <img className='h-[210px] w-[220px] object-cover' src={doctor.image} alt="doctor image" />
                                    </div>
                                    <div className='ml-3 mt-4' >
                                        <p className='text-xl mt-2.5' >{doctor.name}</p>
                                        <p className='text-sm text-gray-500' >{doctor.speciality} </p>
                                        <div onChange={() => setavailibility(!availibility)}  className='flex mb-3 gap-2' >
                                            <input onChange={()=>toogleAvailibility(doctor._id)} type="checkbox" checked={availibility.true} />
                                            <p className='' >Available</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default ListDoctor