import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl } from '../../App'
import { Navigate, useNavigate } from 'react-router-dom'

const DoctorAppointments = () => {
    const navigate = useNavigate()
    const { appointments, patients, dtoken } = useContext(AppContext)
    const [patientsDetails, setpatientsDetails] = useState([])
    const patientsDets = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/doctor/patient', {}, { headers: { token: dtoken } })
            if (response.data.success) {
                setpatientsDetails(response.data.patients)
            }
            else {
                toast.error(response.data.error)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleCancel = async (id) => {
        try {
            const response = await axios.post(backendUrl + "/api/doctor/cancell", { appointmentid: id }, { headers: { token: dtoken } })
            if (response.data.success) {
                toast.success(response.data.completed)
                patientsDets()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const handleComplete = async (id) => {
        try {
            const response = await axios.post(backendUrl + "/api/doctor/complete", { appointmentid: id }, { headers: { token: dtoken } })
            if (response.data.success) {
                toast.success(response.data.message)
                patientsDets()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        patientsDets()
    }, [appointments, patients])
    return patientsDetails && (
        <div className='mt-5 mx-auto px-2 sm:px-0' >
            <p className='font-medium my-2 text-sm sm:text-base md:text-lg' >All Appointments</p>
            <div className='border border-gray-300 h-[80vh] overflow-auto bg-white pl-2 sm:pl-4' >
                <div className='w-full bg-white font-medium text-xs sm:text-sm md:text-base grid grid-cols-[1fr_2fr_2fr_1fr_2fr_3fr] my-2 md:w-[70vw]'  >
                    <p>#</p>
                    <p className='text-xs sm:text-sm md:text-base' >Patients</p>
                    <p className='text-xs sm:text-sm md:text-base' >payment</p>
                    <p className='text-xs sm:text-sm md:text-base'>age</p>
                    <p className='text-xs sm:text-sm md:text-base'>Fee</p>
                    <p className='text-xs sm:text-sm md:text-base'>Action</p>
                </div>
                {
                    patientsDetails?.map((patients, index) => (
                        <div key={index} className='text-xs sm:text-sm md:text-base items-center justify-center grid grid-cols-[1fr_2fr_2fr_1fr_2fr_3fr] py-2 border-t border-gray-300 bg-white w-full sm:w-[70vw]' >
                            <p className='font-medium text-sm sm:text-base md:text-lg' >{index + 1}</p>
                            <p className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm' >
                                <img className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-cover rounded-full' loading='lazy' src={patients?.userData?.image} alt="" /> 
                                <span className='truncate'>{patients?.userData?.name}</span>
                            </p>
                            <p className='text-xs sm:text-sm'>{patients.payment ? "online" : "cash"}</p>
                            <p className='text-xs sm:text-sm' >{patients?.userData?.dob}</p>
                            <p className='text-xs sm:text-sm font-semibold text-green-600' >${patients?.amount}</p>
                            <div className='flex text-xs sm:text-sm items-center gap-1 sm:gap-1.5' >
                                <p className='text-xs sm:text-sm' >{patients.isCompleted && patients.cancelled === false && <p className='inline p-1 sm:p-2 rounded-sm bg-green-200 text-xs' >completed</p>}</p>
                                <p className='text-xs sm:text-sm' >{patients.isCompleted === false && patients.cancelled === true && <p className='inline p-1 sm:p-2 rounded-sm bg-red-200 text-xs' >cancelled</p>}</p>
                                <p className='flex items-center gap-1 sm:gap-1.5' >{patients.isCompleted === false && patients.cancelled === false && (<> <img onClick={() => handleCancel(patients._id)} className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 cursor-pointer' src={assets.cancel_icon} /> <img onClick={() => handleComplete(patients._id)} className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 cursor-pointer' src={assets.completeicon} /> </>)}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DoctorAppointments