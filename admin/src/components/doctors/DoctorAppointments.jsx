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
        <div className='mt-5' >
            <p className='font-medium my-2 ' >All Appointments</p>
            <div className='border border-gray-300 h-[80vh]  overflow-scroll bg-white pl-4 ' >
                <div className=' bg-white font-medium text-lg grid grid-cols-[1fr_2fr_1fr_1fr_2fr_2fr] my-2 w-[70vw]'  >
                    <p>#</p>
                    <p>Patients</p>
                    <p>payment</p>
                    <p>age</p>
                    <p>Fee</p>
                    <p>Action</p>
                </div>
                {
                    patientsDetails?.map((patients, index) => (
                        <div key={index} className=' items-center justify-center grid grid-cols-[1fr_2fr_1fr_1fr_2fr_2fr] py-2 border-t border-gray-300 bg-white w-[70vw]' >
                            <p className='font-medium text-lg' >{index + 1}</p>
                            <p className='flex gap-2 items-center ' ><img className='w-10 h-10 object-cover rounded-full' loading='lazy' src={patients.userData.image} alt="" /> {patients.userData.name}</p>
                            <p>{patients.payment ? "online" : "cash"}</p>
                            <p className='' >{patients.userData.dob}</p>
                            <p>${patients.amount}</p>
                            <div className='flex items-center gap-1.5' >
                                <p>{patients.isCompleted && patients.cancelled === false && <p className='inline p-2 rounded-sm bg-green-200' >completed</p>}</p>
                                <p>{patients.isCompleted === false && patients.cancelled === true && <p className='inline p-2 rounded-sm bg-red-200' >cancelled</p>}</p>
                                <p className='flex items-center gap-1.5' >{patients.isCompleted === false && patients.cancelled === false && (<> <img onClick={() => handleCancel(patients._id)} className='w-10' src={assets.cancel_icon} /> <img onClick={() => handleComplete(patients._id)} className='w-10 cursor-pointer ' src={assets.completeicon} /> </>)}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DoctorAppointments