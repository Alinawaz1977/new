import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <>
      <div className='text-3xl text-center mt-15' >
        <p className='text-gray-500' >About <span className='text-black font-medium ' >Us</span></p>
      </div>
      <div className='flex flex-col sm:flex-row gap-10 items-center mt-15' >
        <img loading='lazy' className='w-[350px]' src={assets.about_image} alt="about-image" />
        <div  >
          <p className='mt-2 text-gray-500 ' >Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p className='mt-5 text-gray-500 ' >Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <p className='text-lg font-medium mt-5 ' >Our Vision</p>
          <p className='mt-5 text-gray-500 ' >Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>
      <div className='text-3xl  mt-15' >
        <p className='text-gray-500' >Why  <span className='text-black font-medium ' >Choose Us</span></p>
      </div>
      <div className='flex flex-col justify-center sm:flex-row ' >
        <div className='w-full sm:w-90  py-8 px-5 border border-gray-200 mt-9' >
          <p className='font-medium  ' >Efficiency:</p>
          <p className='text-gray-500 mt-5 ' >Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className=' w-full sm:w-90  py-8 px-5 border border-gray-200 mt-9' >
          <p className='font-medium  ' >Efficiency:</p>
          <p className='text-gray-500 mt-5 ' >Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className=' w-full sm:w-90  py-8 px-5 border border-gray-200 mt-9' >
          <p className='font-medium  ' >Efficiency:</p>
          <p className='text-gray-500 mt-5 ' >Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
      </div>
    </>
  )
}

export default About