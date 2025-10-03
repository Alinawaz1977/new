import React from 'react'
import Add from './components/Add'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './components/AdminLogin'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import ListDoctor from './components/ListDoctor'
import Dashboard from './components/Dashboard'
import Appointments from './components/Appointments'
import DoctorDashboard from './components/doctors/DoctorDashboard'
import Login from '../../frontend/src/pages/Login'
import { useContext } from 'react'
import { AppContext } from './Context/AppContext'
import DoctorNavbar from './components/doctors/DoctorNavbar'
import DoctorSidebar from './components/doctors/DoctorSidebar'

export const backendUrl = import.meta.env.VITE_BACKEND_URI

const App = () => {
  const { dtoken, token } = useContext(AppContext)


  return (
    <>
      <ToastContainer />
      {/* {
        token === '' && <AdminLogin setToken={setToken} />
      } */}
      {token || dtoken ? <>
        <Navbar />
        <DoctorNavbar />
        <div className='flex pt-16 bg-slate-100 gap-6 border-b h-screen overflow-hidden border-gray-400 ' >
          <Sidebar />
          <DoctorSidebar/>
          <Routes>
            <Route path='/add' element={<Add />} />
            <Route path='/listdoctor' element={<ListDoctor />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/appointments' element={<Appointments />} />
            <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          </Routes>
        </div>
      </> : <AdminLogin />}
      <Routes>
        <Route path='/login' element={<AdminLogin />} />
      </Routes>
    </>
  )
}

export default App