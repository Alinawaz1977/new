
import React from 'react'
import Navbar from './components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor';
import Doctors from './pages/Doctors';
import SpecialityDoctor from './pages/SpecialityDoctor';
import About from './pages/About';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import Login from './pages/Login';
import DoctorPage from './pages/DoctorPage';

export const backendUrl=import.meta.env.VITE_BACKEND_URI

const App = () => {
  return (
    <div className='px-[5vw] md:px-[10vw]' >
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/category/:speciality' element={<SpecialityDoctor/>} />
        <Route path='/about'element={<About/>} />
        <Route path='/contact' element={<ContactUs/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/doctors/:doctorid' element={<DoctorPage/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App