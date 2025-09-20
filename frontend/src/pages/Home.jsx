import React from 'react'
import Hero from '../components/Hero'
import Speciality from '../components/Speciality'
import TopDoctors from '../components/TopDoctors'
import BookAppointment from '../components/BookAppointment'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Speciality/>
        <TopDoctors/>
        <BookAppointment/>
    </div>
  )
}

export default Home