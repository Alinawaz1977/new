import React from 'react'
import { assets } from '../../../admin/src/assets/assets'

const Profile = () => {
  return (
    <form className='w-[40vw] ' >
      <label htmlFor="image">
        <img className='mt-15' src={assets.upload_area} alt="upload-area" />
        <input type="file" hidden />
      </label>
      <p className='text-2xl mt-7 font-medium' >ALI NAWAZ</p>
      <div className='w-full mt-4 bg-gray-200 h-[2px]' ></div>
      <p className='mt-4 underline' >CONTACT INFORMATION</p>
      <div className='mt-5 flex gap-3' >
        <p className='' >EmailId:</p>
        <p className='text-blue-800' >example@gmail.com</p>
      </div>
      <div className='flex gap-3 mt-5 ' >
        <p>Phone:</p>
        <p className='text-blue-800' >example@gmail.com</p>
      </div>
      <div className='flex gap-3 mt-5 items-center ' >
        <p>Address</p>
        <div className='flex flex-col' >
          <p className='text-blue-800' >example@gmail.com</p>
          <p className='text-blue-800' >example@gmail.com</p>
        </div>
      </div>
      <p className='mt-10 underline ' >BASIC INFORMATION</p>
      <div className='flex gap-3 mt-4 ' >
        <p>Gender:</p>
        <p className='text-blue-800' >example@.com</p>
      </div>
      <div className='flex gap-3 mt-4 ' >
        <p>BirthDay</p>
        <p className='text-blue-800' >example@.com</p>
      </div>
      <button className='bg-blue-600 text-white  px-6 py-1 rounded-sm mt-4' >Edit</button>
    </form>
  )
}

export default Profile