import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../Context/AppContext'

const Dashboard = () => {
    const { doctors, token, appointments, patients } = useContext(AppContext)

    return token && (
        <>
            <div>
                <div className='flex gap-2 mt-5'>
                    <div className='border border-gray-200 flex items-center bg-white w-[200px]  ' >
                        <img className='w-20' src={assets.doctor_icon} alt="doctoricon" />
                        <div>
                            <p className='font-medium' >{doctors.length}</p>
                            <p className='text-gray-700' >doctors</p>
                        </div>
                    </div>
                    <div className='border border-gray-200 flex items-center bg-white w-[200px]  ' >
                        <img className='w-20' src={assets.appointments_icon} alt="doctoricon" />
                        <div>
                            <p className='font-medium' >{appointments?.length}</p>
                            <p className='text-gray-700' >appointments</p>
                        </div>
                    </div>
                    <div className='border border-gray-200 flex items-center bg-white w-[200px]  ' >
                        <img className='w-20' src={assets.patients_icon} alt="doctoricon" />
                        <div>
                            <p className='font-medium' >{patients?.length}</p>
                            <p className='text-gray-700' >doctors</p>
                        </div>
                    </div>
                </div>
                <div className='w-[48.2vw] overflow-y-scroll mt-5 bg-white h-[50vh] border border-gray-200  ' >
                    <div className='flex pl-5 border-b border-gray-200 py-5 items-center gap-1.5' >
                        <img src={assets.appointment_icon} alt="appointmenticon" />
                        <p>Latest appointments</p>
                    </div>
                    {
                        appointments.map((appointment, index) => (
                            <div key={index} className='flex mt-0 py-2 justify-between px-4' >
                                <div className='flex gap-1.5  items-center' >
                                    <img className='w-15 rounded-full' src={appointment?.docData?.image} alt="doctorimage" />
                                    <div>
                                        <p className='text-lg font-medium ' >{appointment?.docData?.name}</p>
                                        <p className='text-sm text-gray-400' >Booking on {appointment.slotDate}</p>
                                    </div>
                                </div>
                                <img src={assets.cancel_icon} alt="" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Dashboard