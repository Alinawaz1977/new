import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { assets } from '../assets/assets'
import { backendUrl } from '../App'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Appointments = () => {
  const { appointments, token } = useContext(AppContext)
  return appointments.length < 1 ? <p className='text-xl sm:text-3xl mx-auto my-auto text-center p-4' >No Appointments to Show</p> : (
    <>
      {
        token &&
        <div className='p-2 sm:p-4 w-full max-w-7xl mx-auto' >
          <p className='py-3 text-lg sm:text-xl font-semibold text-center' >All Appointments</p>
          
          {/* Desktop Table View */}
          <div className='hidden lg:block'>
            <div className='border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm'>
              <div className='grid text-sm lg:text-base py-4 px-4 grid-cols-[1fr_2fr_1fr_3.5fr_2.5fr_1fr_1fr] bg-gray-50 font-semibold'>
                <p>#</p>
                <p>Patients</p>
                <p>Age</p>
                <p>Date and Time</p>
                <p>Doctors</p>
                <p className='text-center'>Fees</p>
                <p className='text-center'>Status</p>
              </div>
              {
                appointments?.map((appointment, index) => (
                  <div key={index} className='text-gray-600 grid items-center border-t border-gray-200 py-4 px-4 bg-white hover:bg-gray-50 transition-colors grid-cols-[1fr_2fr_1fr_3.5fr_2.5fr_1fr_1fr] text-sm'>
                    <p className='font-medium'>{index + 1}</p>
                    <p className='flex gap-2 items-center'>
                      <img className='w-8 h-8 rounded-full object-cover' src={appointment?.userData?.image} alt="" />
                      <span className='truncate'>{appointment?.userData?.name}</span>
                    </p>
                    <p>{appointment?.userData?.dob}</p>
                    <p className='text-xs sm:text-sm'>
                      <div>{appointment?.slotDate}</div>
                      <div className='text-gray-500'>{appointment?.slotTime}</div>
                    </p>
                    <p className='flex gap-2 items-center'>
                      <img className='w-8 h-8 object-cover rounded-full' loading='lazy' src={appointment?.docData?.image} alt="" />
                      <span className='truncate'>{appointment?.docData?.name}</span>
                    </p>
                    <p className='text-center font-semibold text-green-600'>${appointment?.docData?.fee}</p>
                    <p className='text-center'>
                      {appointment.cancelled === false && appointment.isCompleted === false && (
                        <span className='px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium'>Pending</span>
                      )}
                      {appointment.cancelled === true && appointment.isCompleted === false && (
                        <span className='px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium'>Cancelled</span>
                      )}
                      {appointment.cancelled === false && appointment.isCompleted === true && (
                        <span className='px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium'>Completed</span>
                      )}
                    </p>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Mobile Card View */}
          <div className='lg:hidden space-y-4 px-2 sm:px-4'>
            {
              appointments?.map((appointment, index) => (
                <div key={index} className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow'>
                  {/* Header with patient info */}
                  <div className='flex items-start justify-between mb-3'>
                    <div className='flex items-center gap-3'>
                      <img className='w-12 h-12 rounded-full object-cover' src={appointment?.userData?.image} alt="" />
                      <div>
                        <p className='font-semibold text-base'>{appointment?.userData?.name}</p>
                        <p className='text-sm text-gray-600'>#{index + 1}</p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='font-bold text-green-600 text-lg'>${appointment?.docData?.fee}</p>
                      <div className='mt-1'>
                        {appointment.cancelled === false && appointment.isCompleted === false && (
                          <span className='px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium'>Pending</span>
                        )}
                        {appointment.cancelled === true && appointment.isCompleted === false && (
                          <span className='px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium'>Cancelled</span>
                        )}
                        {appointment.cancelled === false && appointment.isCompleted === true && (
                          <span className='px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium'>Completed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Doctor info */}
                  <div className='flex items-center gap-3 mb-3 p-2 bg-gray-50 rounded-lg'>
                    <img className='w-10 h-10 object-cover rounded-full' loading='lazy' src={appointment?.docData?.image} alt="" />
                    <div>
                      <p className='font-medium text-sm'>{appointment?.docData?.name}</p>
                      <p className='text-xs text-gray-500'>Doctor</p>
                    </div>
                  </div>

                  {/* Appointment details */}
                  <div className='grid grid-cols-2 gap-3 text-sm'>
                    <div>
                      <p className='text-gray-500 text-xs'>Age</p>
                      <p className='font-medium'>{appointment?.userData?.dob}</p>
                    </div>
                    <div>
                      <p className='text-gray-500 text-xs'>Date & Time</p>
                      <p className='font-medium'>{appointment?.slotDate}</p>
                      <p className='text-gray-500 text-xs'>{appointment?.slotTime}</p>
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

export default Appointments