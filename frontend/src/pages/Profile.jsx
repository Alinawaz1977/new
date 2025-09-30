import React, { useContext } from 'react'
import { assets } from '../../../admin/src/assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { DoctorContext } from '../Context/doctorContext'
import { toast } from 'react-toastify'
import { useEffect,useState } from 'react'

const Profile = () => {
  const { token } = useContext(DoctorContext)
  const [userDetails, setuserDetails] = useState(null)
  const fetchUser = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/user/find", {}, { headers: { token } })
      if (response.data.success) {
        setuserDetails(response.data.user)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
    <form className='w-[40vw] ' >
      <label htmlFor="image">
        <img className='mt-15 w-30 h-30  object-cover ' src={userDetails?.image?userDetails.image:assets.upload_area} alt="upload-area" />
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
      <button className='bg-blue-600 text-white  px-6 py-1 rounded-sm mt-4' >Edit</button>
    </form>







    
    <form className='w-[40vw] ' >
      <label htmlFor="image">
        <img className='mt-15 w-30 h-30  object-cover ' src={userDetails?.image?userDetails.image:assets.upload_area} alt="upload-area" />
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
      <button className='bg-blue-600 text-white  px-6 py-1 rounded-sm mt-4' >Edit</button>
    </form>
    </>
    
  )
}

export default Profile