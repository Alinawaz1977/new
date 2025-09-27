import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { backendUrl } from '../App'
import { useForm } from "react-hook-form"
import { data } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { DoctorContext } from '../Context/doctorContext'
const Login = () => {
    const {token,settoken}=useContext(DoctorContext)
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const [loginType, setloginType] = useState('Login')

    const changeType = () => {
        setloginType(prev => (prev === "Login" ? "SignUp" : "Login"))
    }

    const onSubmit = async (data) => {
        try {
            if (loginType === "Login") {
                const response = await axios.post(backendUrl + "/api/user/login", data)
                if (response.data.success) {
                    settoken(response.data.token)
                    localStorage.setItem("token",response.data.token)
                    
                }
                else {
                    toast.error(response.data.message)
                }
            }
            else {
                const response = await axios.post(backendUrl + "/api/user/create", data)
                if (response.data.success) {
                    settoken(response.data.token)
                    console.log(response.data.token);
                }
                else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            toast.error(error.data)
        }
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center mt-30 items-center  ' >
            <div className=' p-5 w-[400px] min-h-[400px] border shadow-md rounded-2xl border-gray-200  ' >
                <p className='text-2xl font-medium' >{loginType} Account</p>
                <p className='mt-2' >Plz {loginType} to book appointment</p>
                {loginType === "SignUp" && <div className='' >
                    <p className='my-2' >Name</p>
                    <input {...register("name")} className='px-3 w-full py-2 rounded-sm border border-gray-400 ' type="name" placeholder='Enter your name' />
                </div>}

                <div className='' >
                    <p className='my-2' >Email</p>
                    <input {...register("email")} className='px-3 w-full py-2 rounded-sm border border-gray-400 ' type="email" placeholder='Enter your email' />
                </div>
                <div className='' >
                    <p className='my-2' >Password</p>
                    <input {...register("password")} className='px-3 w-full py-2 rounded-sm border border-gray-400 ' type="password" placeholder='Enter your password' />
                </div>
                <button className='px-6 w-full rounded-sm mt-5 py-2 bg-blue-600 text-white transition-all duration-100 cursor-pointer hover:scale-105 ' type="submit   ">Login</button>
                <p onClick={() => changeType()} className='mt-4' >{loginType === "SignUp" ? "already have an account?" : "Create account"} <span className='text-blue-700 cursor-pointer ' >{loginType === "SignUp" ? "login here" : "Create account"}</span></p>
            </div>
        </form>
    )
}

export default Login