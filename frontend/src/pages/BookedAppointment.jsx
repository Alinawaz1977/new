import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { DoctorContext } from '../Context/doctorContext'

const BookedAppointment = () => {
    const { token } = useContext(DoctorContext)
    console.log(token);

    const [bookedDoctors, setbookedDoctors] = useState([])
    const fetchBookedDoctors = async () => {
        try {
            const response = await axios.post(backendUrl + "/api/user/list-appointments", {}, { headers: { token } })
            if (response.data.success) {
                setbookedDoctors(response.data.appointments.reverse())
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancel = async (id, slotDate, slotTime) => {
        console.log("working cancel");

        try {
            const response = await axios.post(backendUrl + "/api/user/cancel", { appointmentid: id, slotDate, slotTime }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // for online payment
    const payOnline = async (appointmentid) => {
        try {
            const response = await axios.post(backendUrl + '/api/user/payment', { appointmentid: appointmentid }, { headers: { token } })
            if (response.data.success) {
                const { session_url } = response.data
                window.location.replace(session_url)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchBookedDoctors()
    }, [])

    return (
        <>
            <p className='text-2xl my-4' >Booked Appointments</p>
            {
                bookedDoctors.map((doctors, index) => (
                    <div key={index} className='flex justify-between flex-col sm:flex-row gap-5 items-center border-t py-4 border-gray-300' >
                        <div className='flex gap-2 flex-col sm:flex-row ' >
                            <img className=' object-cover w-40' src={doctors.docData.image} alt="" />
                            <div >
                                <div>
                                    <p className='text-xl' >{doctors.docData.name}</p>
                                    <p className='text-gray-600' >{doctors.docData.speciality}</p>
                                </div>
                                <p className='mt-3' >Address</p>
                                <div className='mt-1'>
                                    <p>{doctors.docData.address1}</p>
                                    <p>{doctors.docData.address2}</p>
                                </div>
                                <p className='text-gray-800 mt-2' >Date & Time <span className='text-gray-500' > | {doctors.slotTime}</span></p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1.5 items-center' >
                        {doctors.cancelled ? <p className='text-red-500' >Cancelled</p> :<button onClick={() => cancel(doctors._id, doctors.slotDate, doctors.slotTime)} className='border cursor-pointer transtional duration-200 py-1.5 hover:bg-red-600 hover:text-white border-gray-300  px-2  w-50' >Cancel appointment</button> }
                        <div className='flex flex-col gap-2  ' >
                            {doctors.payment ? <p className='text-green-600' >paid</p> :<button onClick={() => payOnline(doctors._id)} className='border cursor-pointer border-gray-300 px-2 transtional duration-200 py-1.5 hover:bg-blue-600 hover:text-white w-50' >pay online</button> }     
                        </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default BookedAppointment