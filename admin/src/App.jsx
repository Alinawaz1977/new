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

export const backendUrl = import.meta.env.VITE_BACKEND_URI

const App = () => {
  const {dtoken}=useContext(AppContext)
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "")

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])

  return (
    <>
<<<<<<< HEAD
      <ToastContainer />
      {/* {
        token === '' && <AdminLogin setToken={setToken} />
      } */}
      {token || dtoken ?<>
        <Navbar />
        <div className='flex pt-16 bg-slate-100 gap-6 border-b h-screen overflow-hidden border-gray-400 ' >
          <Sidebar />
          <Routes>
            <Route path='/add' element={<Add token={token} />} />
            <Route path='/listdoctor' element={<ListDoctor token={token} />} />
            <Route path='/dashboard' element={<Dashboard token={token} />} />
            <Route path='/appointments' element={<Appointments token={token} />} />
            <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
          </Routes>
        </div>
      </>:''}
      <Routes>
            <Route path='/login' element={<AdminLogin setToken={setToken} />}  />
      </Routes>
=======
      {
        token === '' ? <AdminLogin setToken={setToken} /> : <>
        <ToastContainer />
          <Navbar />
          <div className='flex pt-16 bg-slate-100 gap-6 border-b h-screen overflow-hidden border-gray-400 ' >
            <Sidebar />
            <Routes>
              <Route path='/add' element={<Add token={token} />} />
              <Route path='/listdoctor' element={<ListDoctor token={token} />} />
              <Route path='/dashboard' element={<Dashboard token={token} />} />
              <Route path='/appointments' element={<Appointments token={token} />} />
            </Routes>
          </div>
        </>
      }
>>>>>>> c7bfdca2ec6e590849b459b299c338d8387d5462
    </>
  )
}

export default App