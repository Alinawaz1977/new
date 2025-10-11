import React, { useContext } from 'react'
import { assets } from '../../../admin/src/assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { DoctorContext } from '../Context/doctorContext'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'


const Profile = () => {
  const { token } = useContext(DoctorContext)
  const navigate = useNavigate()
  const [userDetails, setuserDetails] = useState('')
  const [image, setimage] = useState('')
  const [loading, setLoading] = useState(true)

  const [profileType, setprofileType] = useState('save')
  const [address1, setaddress1] = useState('')
  const [address2, setaddress2] = useState('')
  const [phone, setphone] = useState('')
  const [gender, setgender] = useState('')
  const [dob, setdob] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const fetchUser = async () => {
    if (!token) {
      setLoading(false)
      return
    }
    
    try {
      setLoading(true)
      const response = await axios.post(backendUrl + "/api/user/find", {}, { headers: { token } })
      if (response.data.success) {
        setuserDetails(response.data.user)
      } else {
        toast.error(response.data.message || "Failed to fetch user data")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData()
    formData.append("image", image) // selectedFile must be a File object from input
    formData.append("address1", data.address1)
    formData.append("address2", data.address2)
    formData.append("gender", data.gender)
    formData.append("dob", data.dob)
    formData.append("phone", data.phone)

    try {
      const response = await axios.post(backendUrl + "/api/user/update", formData,
        {
          headers: { token },      // Include auth token if needed
        })
      if (response.data.success) {
        toast.success(response.data.message)
        setprofileType('save')
        fetchUser()
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      fetchUser()
    }
  }, [token])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-lg font-medium text-gray-600'>Loading profile...</div>
      </div>
    )
  }

  if (!userDetails) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-lg font-medium text-red-600'>Failed to load profile data</div>
      </div>
    )
  }

  return (
    <>
      {
        profileType === 'save' &&
        <form className='w-[40vw] ' >
          <label htmlFor="image">
            <img loading='lazy' className='mt-15 w-30 h-30  object-cover ' src={userDetails?.image ? userDetails.image : assets.upload_area} alt="upload-area" />
            <input type="file" hidden />
          </label>
          <p className='text-2xl mt-7 font-medium' >{userDetails?.name}</p>
          <div className='w-full mt-4 bg-gray-200 h-[2px]' ></div>
          <p className='mt-4 underline' >CONTACT INFORMATION</p>
          <div className='mt-5 flex gap-3 items-center ' >
            <p className='' >EmailId :</p>
            <p className='text-blue-800' >{userDetails?.email}</p>
          </div>
          <div className='flex gap-3 mt-5 ' >
            <p>Phone:</p>
            <p className='text-blue-800' >{userDetails?.phone}</p>
          </div>
          <div className='flex gap-3 mt-5 items-center ' >
            <p>Address</p>
            <div className='flex flex-col' >
              <p className='text-blue-800' >{userDetails?.address1}</p>
              <p className='text-blue-800' >{userDetails?.address2}</p>
            </div>
          </div>
          <p className='mt-10 underline ' >BASIC INFORMATION</p>
          <div className='flex gap-3 mt-4 ' >
            <p>Gender:</p>
            <p className='text-blue-800' >{userDetails?.gender}</p>
          </div>
          <div className='flex gap-3 mt-4 ' >
            <p>BirthDay</p>
            <p className='text-blue-800' >{userDetails?.dob}</p>
          </div>
          <button onClick={() =>
            setprofileType(prev => (prev === 'edit' ? 'save' : 'edit'))} className='bg-red-600 cursor-pointer   text-white  px-6 py-1 rounded-sm mt-4' >Edit</button>
        </form>
      }
      {
        profileType === 'edit' &&
        <form onSubmit={handleSubmit(onSubmit)} className='w-[40vw] ' >
          <label htmlFor="image">
            <img className='mt-15 w-30 h-30  object-cover ' src={image ? URL.createObjectURL(image) : userDetails?.image} alt="upload-area" />
            <input onChange={(e) => setimage(e.target.files[0])} type="file" id='image' hidden />
          </label>
          <p className='text-2xl mt-7 font-medium' >{userDetails?.name}</p>
          <div className='w-full mt-4 bg-gray-200 h-[2px]' ></div>
          <p className='mt-4 underline' >CONTACT INFORMATION</p>
          <div className='mt-5 flex gap-3 items-center ' >
            <p className='' >EmailId :</p>
            <p className='text-blue-800' >{userDetails?.email}</p>
          </div>
          <div className='flex gap-3 mt-5 ' >
            <p>Phone:</p>
            <input defaultValue={userDetails?.phone} {...register("phone", { required: { value: true, message: "required" } })} />
            {errors.phone && <p className='text-red-500' >required</p>}
          </div>
          <div className='flex gap-3 mt-5 items-center ' >
            <p>Address</p>
            <div className='flex flex-col' >
              <input defaultValue={userDetails?.address1} {...register("address1", { required: { value: true, message: "required" } })} type="text" placeholder={userDetails?.address1} />
              {errors.address1 && <p className='text-red-500' >required</p>}
              <input defaultValue={userDetails?.address2} {...register("address2", { required: { value: true, message: "required" } })} type="text" placeholder={userDetails?.address2} />
              {errors.address2 && <p className='text-red-500' >required</p>}
            </div>
          </div>
          <p className='mt-10 underline ' >BASIC INFORMATION</p>
          <div className='flex gap-3 mt-4 ' >
            <p>Gender:</p>
            <select {...register("gender", { required: { value: true, message: "required" } })} >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className='flex gap-3 mt-4 ' >
            <p>BirthDay</p>
            <input {...register("dob", { required: { value: true, message: "required" } })} type="date" />
            {errors.dob && <p className='text-red-500' >required</p>}
          </div>
          {isSubmitting ? <p className='font-medium text-xl mt-2 text-green-500 ' >Updating...</p> : <button className='cursor-pointer bg-blue-600 text-white  px-6 py-1 rounded-sm mt-4' >save</button>}

        </form>
      }
    </>

  )
}

export default Profile            