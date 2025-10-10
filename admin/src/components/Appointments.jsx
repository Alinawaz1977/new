import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { assets } from '../assets/assets'
import { backendUrl } from '../App'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Appointments = () => {
  const { appointments, token } = useContext(AppContext)
  return appointments.length < 1 ? <p className='text-xl sm:text-3xl mx-auto my-auto text-center px-4' >No Appointments to Show</p> : (
    <>
      {
        token &&
        <div className='p-3 w-full max-w-7xl mx-auto' >
          <p className='py-3 text-lg sm:text-xl font-semibold' >All Appointments</p>
          
          {/* Desktop Table View */}
          <div className='hidden lg:block border border-gray-300 overflow-x-auto min-h-auto'>
            <div className='grid text-sm sm:text-base py-3 grid-cols-[1fr_2fr_1fr_3.5fr_2.5fr_1fr_1fr] px-4 bg-white w-full'>
              <p className='font-semibold'>#</p>
              <p className='font-semibold'>Patients</p>
              <p className='font-semibold'>Age</p>
              <p className='font-semibold'>Date and Time</p>
              <p className='font-semibold'>Doctors</p>
              <p className='font-semibold text-center'>Fees</p>
              <p className='font-semibold text-center'>Status</p>
            </div>
            {
              appointments?.map((appointment, index) => (
                <div key={index} className='text-gray-600 grid items-center border-t border-gray-300 py-3 bg-white grid-cols-[1fr_2fr_1fr_3.5fr_2.5fr_1fr_1fr] px-4 text-sm w-full'>
                  <p>{index + 1}</p>
                  <p className='flex gap-2 items-center'>
                    <img className='w-8 h-8 rounded-full object-cover object-top' src={appointment?.userData?.image} alt="" />
                    <span className='truncate'>{appointment?.userData?.name}</span>
                  </p>
                  <p>{appointment?.userData?.dob}</p>
                  <p className='truncate'>{appointment?.slotDate} || {appointment?.slotTime}</p>
                  <p className='flex gap-2 items-center'>
                    <img className='w-8 h-8 object-cover rounded-full' loading='lazy' src={appointment?.docData?.image} alt="" />
                    <span className='truncate'>{appointment?.docData?.name}</span>
                  </p>
                  <p className='text-center'>${appointment?.docData?.fee}</p>
                  <p className='text-center'>
                    {appointment.cancelled===false && appointment.isCompleted===false && <span className='px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs'>Pending</span>}
                    {appointment.cancelled===true && appointment.isCompleted===false && <span className='px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs'>Cancelled</span>}
                    {appointment.cancelled===false && appointment.isCompleted===true && <span className='px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs'>Completed</span>}
                  </p>
                </div>
              ))
            }
          </div>

          {/* Mobile Card View */}
          <div className='lg:hidden space-y-4'>
            {
              appointments?.map((appointment, index) => (
                <div key={index} className='bg-white border border-gray-300 rounded-lg p-4 shadow-sm'>
                  <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center gap-3'>
                      <img className='w-12 h-12 rounded-full object-cover' src={appointment?.userData?.image} alt="" />
                      <div>
                        <p className='font-semibold text-sm'>{appointment?.userData?.name}</p>
                        <p className='text-xs text-gray-500'>Age: {appointment?.userData?.dob}</p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-lg font-bold text-green-600'>${appointment?.docData?.fee}</p>
                      <p className='text-xs text-gray-500'>#{index + 1}</p>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-3 mb-3'>
                    <img className='w-10 h-10 rounded-full object-cover' src={appointment?.docData?.image} alt="" />
                    <div>
                      <p className='font-medium text-sm'>{appointment?.docData?.name}</p>
                      <p className='text-xs text-gray-500'>Doctor</p>
                    </div>
                  </div>
                  
                  <div className='mb-3'>
                    <p className='text-sm text-gray-600'>
                      <span className='font-medium'>Date:</span> {appointment?.slotDate} || {appointment?.slotTime}
                    </p>
                  </div>
                  
                  <div className='flex justify-end'>
                    {appointment.cancelled===false && appointment.isCompleted===false && <span className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium'>Pending</span>}
                    {appointment.cancelled===true && appointment.isCompleted===false && <span className='px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium'>Cancelled</span>}
                    {appointment.cancelled===false && appointment.isCompleted===true && <span className='px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium'>Completed</span>}
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

export default Appointments