import React from 'react'
import { assets } from '../assets/assets'

const ContactUs = () => {
    return (
        <>
            <div className='text-3xl text-center mt-15'>
                <p className='text-gray-500' >About <span className='text-black font-medium ' >Us</span></p>
            </div>
            <div className='flex flex-col sm:flex-row gap-10 justify-center mt-10 items-center' >
                <img className='w-[350px]' src={assets.contact_image} alt="contact-image" />
                <div>
                    <p className='text-lg font-medium' >Our OFFICE</p>
                    <div className='mt-10 text-gray-500 ' >
                        <p>54709 Willms Station </p>
                        <p>Suite 350, Washington, USA</p>
                    </div>
                    <div className='mt-10 text-gray-500 ' >
                        <p>Tel: (415) 555‑0132</p>
                        <p>Email: greatstackdev@gmail.com</p>
                    </div>
                    <div  >
                        <p className='mt-10 text-black font-medium text-lg  ' >Careers at PRESCRIPTO</p>
                        <p className=' text-gray-500 ' >Learn more about our teams and job openings.</p>
                    </div>
                    <button className=' transition-all duration-300 py-2 px-4 mt-5 border border-black cursor-pointer hover:text-white hover:bg-black ' >Explore Jobs</button>
                </div>
                
            </div>
        </>
    )
}
export default ContactUs