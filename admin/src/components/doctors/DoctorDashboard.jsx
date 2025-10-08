import React from 'react'
import { useContext } from 'react'
import { NavLink, Links } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets'
import axios from "axios"
import { backendUrl } from '../../App'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const DoctorDashboard = () => {
  const { doctors, appointments, patients, dtoken } = useContext(AppContext)
  const [patientsDetails, setpatientsDetails] = useState([])

  const [stats, setstats] = useState([])
  console.log(stats);
  const patientsDets = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/doctor/patient', {}, { headers: { token: dtoken } })
      if (response.data.success) {
        setpatientsDetails(response.data.patients.reverse())
        setstats(response.data.stats)
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
              const response = await axios.post(backendUrl + "/api/doctor/cancell", { appointmentid: id }, { headers: {token:dtoken } })
              if(response.data.success){
                  toast.success(response.data.completed)
                  patientsDets()
              }
          } catch (error) {
              toast.error(error.message)
          }
      }
      const handleComplete = async (id) => {
          try {
              const response = await axios.post(backendUrl + "/api/doctor/complete", { appointmentid: id }, { headers: {token:dtoken } })
              if(response.data.success){
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

  return (

    <div className='w-full mx-3' >
      <div className=' flex flex-col sm:flex-row  items-center gap-2 mt-5'>
        <div className='border border-gray-200 flex items-center bg-white w-[200px]  ' >
          <img className='w-20' src={assets.earning_icon} alt="doctoricon" />
          <div>
            <p className='font-medium' >${stats[0]?.totalEarnings}</p>
            <p className='text-gray-700' >Earnings</p>
          </div>
        </div>
        <div className='border border-gray-200 flex items-center bg-white w-[200px]  ' >
          <img className='w-20' src={assets.appointments_icon} alt="doctoricon" />
          <div>
            <p className='font-medium' >{patientsDetails?.length}</p>
            <p className='text-gray-700' >appointments</p>
          </div>
        </div>
        <div className='border border-gray-200 flex items-center bg-white w-[200px]  ' >
          <img className='w-20' src={assets.patients_icon} alt="doctoricon" />
          <div>
            <p className='font-medium' >{stats[0]?.uniqueUserCount}</p>
            <p className='text-gray-700' >Patients</p>
          </div>
        </div>
      </div>
      <div className=' w-full lg:w-[48.2vw]  overflow-y-scroll mt-5 bg-white h-[50vh] border border-gray-200  ' >
        <div className='flex pl-5 border-b border-gray-200 py-5 items-center gap-1.5' >
          <img src={assets.appointment_icon} alt="appointmenticon" />
          <p>Latest appointments</p>
        </div>
        {
          patientsDetails.map((appointment, index) => (
            <div key={index} className='flex mt-0 py-2 justify-between px-4' >
              <div className='flex gap-1.5  items-center' >
                <img className='w-15  h-15 object-cover rounded-full' src={appointment?.userData?.image} alt="doctorimage" />
                <div>
                  <p className='sm:text-lg text-sm font-medium ' >{appointment?.userData?.name}</p>
                  <p className='text-sm text-gray-400' >Booking on {appointment.slotDate}</p>
                </div>
              </div>
              <div className='flex items-center gap-1.5' >
                <p>{appointment?.isCompleted && appointment?.cancelled === false && <p className='inline p-2 rounded-sm bg-green-200' >completed</p>}</p>
                <p>{appointment?.isCompleted === false && appointment?.cancelled === true && <p className='inline p-2 rounded-sm bg-red-200' >cancelled</p>}</p>
                <p className='flex items-center gap-1.5' >{appointment?.isCompleted === false && appointment?.cancelled === false && (<> <img onClick={() => handleCancel(appointment?._id)} className='w-10' src={assets.cancel_icon} /> <img onClick={() => handleComplete(appointment?._id)} className='w-10 cursor-pointer ' src={assets.completeicon} /> </>)}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorDashboard