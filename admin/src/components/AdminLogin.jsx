import React, { useState } from 'react'
import Title from './Title'
import axios from "axios"
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

const AdminLogin = ({ setToken }) => {
  const { dtoken, setdtoken } = useContext(AppContext)
  console.log(dtoken);
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginType, setLoginType] = useState('admin') // default to admin

  const toggleLoginType = () => {
    setLoginType(prev => (prev === 'admin' ? 'doctor' : 'admin'))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loginType === 'admin') {
      try {
        const response = await axios.post(backendUrl + "/api/admin/login", { email, password })
        if (response.data.success) {
          setToken(response.data.token)
        }
        else {
          toast.error(response.error.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    else {
      try {
        const response = await axios.post(backendUrl + "/api/doctor/login", { email, password })
        if (response.data.success) {
          setdtoken(response.data.token)
        }
        else {
          toast.error(response.error.message)
        }
      }
      catch (error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <div className="flex justify-center items-center w-full h-[90vh] overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="w-[380px] border border-gray-100 rounded-md shadow-md p-5 flex flex-col gap-2.5"
      >
        <Title text1={loginType === 'admin' ? "Admin" : "Doctor"} text2="Login" />

        <p>Email</p>
        <input
          placeholder="email"
          className="w-full py-1.5 rounded-sm px-2 border-2 border-gray-200"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
        />

        <p>Password</p>
        <input
          placeholder="password"
          className="w-full py-1.5 rounded-sm px-2 border-2 border-gray-200"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
        />

        <button
          className="cursor-pointer text-white mt-1.5 transition-all duration-100 font-medium bg-blue-600 w-full hover:scale-105 rounded-sm py-1.5"
          type="submit"
        >
          Login
        </button>

        <p className="text-sm">
          {loginType === 'admin' ? "Doctor Login? " : "Admin Login? "}
          <span
            onClick={toggleLoginType}
            className="text-blue-600 cursor-pointer"
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  )
}
export default AdminLogin
