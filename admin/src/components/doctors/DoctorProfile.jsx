import axios from 'axios'
import React from 'react'
import { backendUrl } from '../../App'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useCallback } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'

const DoctorProfile = () => {
  const [profileType, setprofileType] = useState('save')
  const { dtoken } = useContext(AppContext)
  const [doctorProfile, setdoctorProfile] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    degree: '',
    speciality: '',
    experience: '',
    description: '',
    fee: '',
    address1: '',
    address2: ''
  })
  const [loading, setLoading] = useState(false)
  const docProfile = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/doctor/profile', {}, {
        headers: {
          token: dtoken
        }
      })
      if (response.data.success) {
        setdoctorProfile(response.data.doctor)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    docProfile()
  }, [])

  const handleEditClick = () => {
    if (!doctorProfile) return
    setFormData({
      name: doctorProfile.name || '',
      degree: doctorProfile.degree || '',
      speciality: doctorProfile.speciality || '',
      experience: doctorProfile.experience || '',
      description: doctorProfile.description || '',
      fee: doctorProfile.fee || '',
      address1: doctorProfile.address1 || '',
      address2: doctorProfile.address2 || ''
    })
    setprofileType('edit')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCancel = () => {
    setprofileType('save')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post(backendUrl + '/api/doctor/update-profile', {
        ...formData
      }, {
        headers: { token: dtoken }
      })
      if (response.data.success) {
        setdoctorProfile(response.data.doctor)
        toast.success('Profile updated')
        setprofileType('save')
      } else {
        toast.error(response.data.message || 'Update failed')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
      <form className='w-full max-w-2xl mx-auto' onSubmit={handleSubmit}>
        <label className='block' htmlFor="image">
          <img loading='lazy' className='mt-4 w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 mx-auto hover:bg-blue-600 rounded-xl transition-all duration-150 object-cover' src={doctorProfile?.image} alt="upload-area" />
          <input type="file" hidden />
        </label>

        {profileType === 'save' && (
          <>
            <p className='text-xl sm:text-2xl mt-7 font-medium text-center' >{doctorProfile?.name}</p>
            <div className='w-full mt-4 bg-gray-200 h-[2px]' ></div>
            <div className='mt-5 flex flex-col sm:flex-row gap-2 sm:gap-3 items-center justify-center' >
              <p className='text-sm sm:text-base' >{doctorProfile?.degree}</p>
              <p className='text-sm sm:text-base' >{doctorProfile?.speciality}</p>
              <p className='rounded-xl px-3 py-1 text-xs sm:text-sm border border-gray-300' >{doctorProfile?.experience} years</p>
            </div>
            <div className='mt-5 text-center' >
              <p className='text-sm sm:text-base'>{doctorProfile?.description}</p>
            </div>
            <div className='flex gap-1.5 justify-center mt-3' >
              <p className='text-sm sm:text-base'>Fee:</p>
              <p className='text-sm sm:text-base font-semibold'>${doctorProfile?.fee}</p>
            </div>
            <div className='flex flex-col sm:flex-row gap-3 mt-5 items-start sm:items-center' >
              <p className='text-sm sm:text-base font-medium'>Address:</p>
              <div className='flex flex-col' >
                <p className='text-blue-800 text-sm sm:text-base' >{doctorProfile?.address1}</p>
                <p className='text-blue-800 text-sm sm:text-base' >{doctorProfile?.address2}</p>
              </div>
            </div>
            <button type='button' onClick={handleEditClick} className='bg-red-600 cursor-pointer text-white px-6 py-2 rounded-sm mt-4 w-full sm:w-auto'>Edit</button>
          </>
        )}

        {profileType === 'edit' && (
          <>
            <input className='mt-7 w-full border px-3 py-2 rounded text-sm sm:text-base' name='name' value={formData.name} onChange={handleChange} placeholder='Name' />
            <div className='w-full mt-4 bg-gray-200 h-[2px]' ></div>
            <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-center' >
              <input className='border px-3 py-2 rounded text-sm sm:text-base' name='degree' value={formData.degree} onChange={handleChange} placeholder='Degree' />
              <input className='border px-3 py-2 rounded text-sm sm:text-base' name='speciality' value={formData.speciality} onChange={handleChange} placeholder='Speciality' />
              <input className='border px-3 py-2 rounded text-sm sm:text-base sm:col-span-2 lg:col-span-1' name='experience' value={formData.experience} onChange={handleChange} placeholder='Experience (years)' />
            </div>
            <textarea className='mt-5 w-full border px-3 py-2 rounded text-sm sm:text-base' name='description' value={formData.description} onChange={handleChange} placeholder='Description' rows="3" />
            <div className='flex flex-col sm:flex-row gap-1.5 mt-3 items-start sm:items-center'>
              <p className='text-sm sm:text-base font-medium'>Fee:</p>
              <input className='border px-3 py-2 rounded w-full sm:w-32 text-sm sm:text-base' name='fee' value={formData.fee} onChange={handleChange} placeholder='Fee' />
            </div>
            <div className='flex flex-col sm:flex-row gap-3 mt-5 items-start' >
              <p className='pt-2 text-sm sm:text-base font-medium'>Address:</p>
              <div className='flex flex-col flex-1' >
                <input className='text-blue-800 border px-3 py-2 rounded mb-2 text-sm sm:text-base' name='address1' value={formData.address1} onChange={handleChange} placeholder='Address line 1' />
                <input className='text-blue-800 border px-3 py-2 rounded text-sm sm:text-base' name='address2' value={formData.address2} onChange={handleChange} placeholder='Address line 2' />
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-3 mt-4'>
              <button disabled={loading} type='submit' className='bg-green-600 disabled:opacity-60 cursor-pointer text-white px-6 py-2 rounded-sm text-sm sm:text-base w-full sm:w-auto'>
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button type='button' onClick={handleCancel} className='bg-gray-300 cursor-pointer text-black px-6 py-2 rounded-sm text-sm sm:text-base w-full sm:w-auto'>Cancel</button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

export default DoctorProfile