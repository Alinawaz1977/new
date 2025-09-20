import React from 'react'
import Add from './components/Add'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './components/AdminLogin'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import ListDoctor from './components/ListDoctor'

export const backendUrl=import.meta.env.VITE_BACKEND_URI

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"")

 useEffect(() => {
 localStorage.setItem("token",token)
 }, [token])
 
  

  return (
    <>
    <ToastContainer/>
      {
        token === '' ? <AdminLogin setToken={setToken} /> :<>
    <Navbar/>
    <div className='flex pt-16 bg-slate-100 gap-6 border-b h-screen overflow-hidden border-gray-400 ' >
      <Sidebar/>
      <Routes>
        <Route path='/add' element={<Add token={token} />} />
        <Route path='/listdoctor' element={<ListDoctor token={token} />} />
      </Routes>
    </div>
        </>
      }
    </>
  )
}

export default App