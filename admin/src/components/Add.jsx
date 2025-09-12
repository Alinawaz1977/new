import React from 'react'
import { assets } from '../assets/assets'

const Add = () => {
  return (
    <>
    <div className='flex flex-col' >
    <p className='font-medium my-3 ' >Add Doctor</p>
    <div className='border pt-5 pl-8 pr-25 border-gray-300 w-[60vw] bg-white h-[80vh]' >
        <form>
          <label className='flex gap-3.5 items-center' htmlFor="upload">
            <img className='w-20' src={assets.upload_area} alt="" />
            <p className='w-30' >Upload doctor picture</p>
            <input type="file" id="upload" hidden />
          </label>
        </form>
    </div>
    </div>
    </>
  )
}

export default Add