import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <>
    <div className='flex flex-col md:flex-row justify-center mt-20 gap-3 ' >
        <div className=' w-[60vw]' >
            <img className='w-32' src={assets.logo} alt="" />
            <p className=' text-gray-700 mt-3.5' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nobis rem unde libero atque incidunt quae possimus commodi vel necessitatibus asperiores iure rerum accusamus quo consectetur facilis ullam, praesentium repellendus.</p>
        </div>
        <div className=' flex justify-center items-center flex-col  w-[20vw]' >
            <p className='text-lg font-medium   ' >COMPANY</p>
            <ul className='list-none mt-3 flex flex-col gap-2 text-gray-700' >
                <li>Home</li>
                <li>About Us</li>
                <li>Deleivery</li>
                <li>Privacy</li>
            </ul>
        </div>
        <div className=' flex ml-1   w-full md:ml-0 md:items-center flex-col  md:w-[20vw]' >
        <div >
            <p  className='text-lg font-medium' >GET IN TOUCH</p>
            <ul className='list-none mt-3 text-gray-700 flex flex-col gap-2' >
                <li>+923006008399</li>
                <li>ali@gmail.com</li>
            </ul>
        </div>
    </div>
    </div>
    <div className='bg-gray-300 mt-10  w-full h-[2px]' ></div>
    <p className='text-center my-3.5' >Copyright 2024 @ Greatstack.dev - All Right Reserved.</p>
    </>
  )
}

export default Footer