import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DoctorContext } from '../Context/doctorContext'
import { assets } from '../assets/assets'

const DoctorPage = () => {
    const { doctors } = useContext(DoctorContext)
    const { doctorid } = useParams()
    const doctor = doctors.find((doctor) => doctor._id === doctorid)

    // Days & time slots (can come from backend too)
    const days = ["Mon 10", "Tue 11", "Wed 12", "Thu 13", "Fri 14", "Sat 15", "Sun 16"]
    const timeSlots = ["8.00 am", "8.30 am", "9.00 am", "9.30 am", "10.00 am", "10.30 am", "11.00 am", "11.30 am"]

    // Selected states
    const [selectedDay, setSelectedDay] = useState(days[0])
    const [selectedTime, setSelectedTime] = useState(null)

    const handleBooking = () => {
        if (!selectedDay || !selectedTime) {
            alert("Please select a day and time slot!")
            return
        }
        alert(`Appointment booked with ${doctor.name} on ${selectedDay} at ${selectedTime}`)
    }

    return (
        <>
            <div className='flex gap-3'>
                {/* Doctor Card */}
                <div className='h-[310px] shrink-0 relative rounded-xl w-[280px] bg-blue-600'>
                    <img 
                        className='absolute h-[310px] w-[280px] object-cover bottom-0' 
                        src={doctor.image} 
                        alt="doctorimage" 
                    />
                </div>

                {/* Doctor Info + Booking */}
                <div className='flex flex-col'>
                    <div className='w-[60vw] p-10 border border-gray-500 rounded-lg'>
                        <p className='text-3xl font-medium'>{doctor.name}</p>
                        <p className='mt-1 text-gray-500'>
                            {doctor.degree} - {doctor.speciality}
                            <span className='ml-2 px-2 py-0.5 rounded-full border border-gray-500'>
                                {doctor.experience} Years
                            </span>
                        </p>
                        <p className='flex items-center gap-1 font-medium mt-2'>
                            About <img className='w-4' src={assets.info_icon} alt="" />
                        </p>
                        <p className='text-gray-500 mt-1'>{doctor.description}</p>
                        <p className='mt-1'>Appointment fee: 
                            <span className='font-bold'> ${doctor.fee}</span>
                        </p>
                    </div>

                    {/* Booking Slots */}
                    <div className='mt-4'>
                        <p className='text-3xl font-medium mb-2'>Booking Slots</p>

                        {/* Days */}
                        <div className='flex gap-2 mb-4'>
                            {days.map((day) => (
                                <button 
                                    key={day} 
                                    className={`px-4 py-2 rounded-full border 
                                        ${selectedDay === day ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
                                    onClick={() => setSelectedDay(day)}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>

                        {/* Time Slots */}
                        <div className='flex gap-2 flex-wrap mb-4'>
                            {timeSlots.map((time) => (
                                <button 
                                    key={time} 
                                    className={`px-4 py-2 rounded-full border 
                                        ${selectedTime === time ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
                                    onClick={() => setSelectedTime(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>

                        {/* Book Button */}
                        <button 
                            onClick={handleBooking} 
                            className='px-6 py-2 rounded-xl bg-blue-600 text-white font-medium shadow-md'
                        >
                            Book an appointment
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorPage
