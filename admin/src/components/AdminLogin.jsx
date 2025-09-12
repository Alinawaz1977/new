import React from 'react'
import { useState } from 'react'

const AdminLogin = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
  return (
    <div className='flex justify-center items-center w-full  h-[90vh] overflow-hidden ' >
      <form className='w-[350px]  rounded-md shadow-md  p-5 flex flex-col gap-2.5 ' >
        <p className='text-xl my-3 font-medium' >Admin Login</p>
        <input placeholder='email ' className='w-[100%] py-1.5 rounded-sm px-2  border-2 border-gray-700' onChange={(e)=>setemail(e.target.value)} type="email" value={email} />
        <input placeholder='password' className='w-[100%] py-1.5 rounded-sm px-2  border-2 border-gray-700' onChange={(e)=>setemail(e.target.value)} type="password" value={password} />
        <button className='cursor-pointer text-white mt-3 transition-all duration-100 bg-blue-600 w-full hover:scale-110 rounded-sm py-1.5' type="submit">Login</button>
      </form>
    </div>
  )
}

export default AdminLogin
