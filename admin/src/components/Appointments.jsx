import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { assets } from '../assets/assets'
import { backendUrl } from '../App'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Appointments = () => {
  const { appointments, token } = useContext(AppContext)
  return appointments.length < 1 ? <p className='text-3xl mx-auto my-auto' >No Appointments to Show</p> : (
    <>
      {
        token &&
        <div className='p-3 w-full  ' >
          <p className='py-3' >All Appointments</p>
          <div className='border border-gray-300 w-fit overflow-scroll min-h-auto ' >

            <div className='grid sm:px-10 text-sm sm:text-base py-3  grid-cols-[1fr_2fr_1fr_3.5fr_2.5fr_1fr_1fr] px-1 bg-white w-full md:w-[70vw] ' >
              <p>#</p>
              <p>Patients</p>
              <p>Age</p>
              <p>Date and Time  </p>
              <p>Doctors  </p>
              <p className='text-center' >Fees</p>
            </div>
            {
              appointments?.map((appointment, index) => (

                <div className=' text-gray-600 grid items-center sm:px-10 border-t border-gray-300 py-3 bg-white grid-cols-[1fr_2fr_1fr_3.5fr_2.5fr_1fr_1fr] px-1 text-sm w-full md:w-[70vw]' >
                  <p>{index + 1}</p>
                  <p className='flex gap-1 items-center' ><img className='w-10 h-10 rounded-full hidden sm:block object-cover object-top ' src={appointment?.userData?.image} alt="" />{appointment?.userData?.name}</p>
                  <p>{appointment?.userData?.dob}</p>
                  <p>{appointment?.slotDate} || {appointment?.slotTime}</p>
                  <p className='flex gap-2 items-center ' ><img className='w-10 hidden sm:block object-cover rounded-full ' loading='lazy' src={appointment?.docData?.image} alt="" />{appointment?.docData?.name}</p>
                  <p className='text-center' >${appointment?.docData?.fee}</p>
                  <img className='w-10 hidden sm:block' src={assets.cancel_icon} alt="" />
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