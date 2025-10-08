import React from 'react'
import { assets } from '../assets/assets'
import { Form, useForm } from "react-hook-form"
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import Lottie from "lottie-react"

import loader from "../assets/loader.json"
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

const Add = () => {
  const { token } = useContext(AppContext)
  const [image, setimage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, reset
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const formdata = new FormData()
      formdata.append("image", image)
      formdata.append("name", data.name)
      formdata.append("speciality", data.speciality)
      formdata.append("email", data.email)
      formdata.append("password", data.password)
      formdata.append("description", data.description)
      formdata.append("experience", data.experience)
      formdata.append("fee", data.fee)
      formdata.append("degree", data.degree)
      formdata.append("address1", data.address1)
      formdata.append("address2", data.address2)

      const response = await axios.post(backendUrl + "/api/doctor/add", formdata, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        setimage('')
        reset()
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  return (
    <>
      {
        token &&
        <div className="flex mx-2 flex-col w-full ">
          <p className="font-medium my-3">Add Doctor</p>
          <div className="border pt-5 pl-8 pr-8 border-gray-300 w-full  md:w-[60vw] bg-white h-[83vh] overflow-auto">
            <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Upload Picture (full width) */}
              <div className="col-span-2">
                <label className="flex gap-3.5 items-center cursor-pointer" htmlFor="upload">
                  <img className="w-20 h-20 rounded-full object-cover object-top " src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                  <p>Upload doctor picture</p>
                  <input onChange={(e) => setimage(e.target.files[0])} type="file" id="upload" hidden />
                </label>
              </div>
              {/* Left Column */}
              <div>
                <p className="my-2">Doctor Name</p>
                <input
                  className="w-full py-1.5 px-3 border-2 rounded-sm border-gray-300"
                  {...register("name")}
                  placeholder="name"
                />
                <p className="my-2">Doctor Email</p>
                <input
                  className="w-full py-1.5 px-3 border-2 rounded-sm border-gray-300"
                  {...register("email")}
                  placeholder="Email"
                />

                <p className="my-2">Doctor Password</p>
                <input
                  className="w-full py-1.5 px-3 border-2 rounded-sm border-gray-300"
                  {...register("password")}
                  placeholder="Password"
                />

                <p className="my-2">Experience</p>
                <select
                  className="py-1.5 block px-2 w-full border-2 border-gray-400 rounded-sm"
                  {...register("experience")}
                >
                  <option value="5">5 years</option>
                  <option value="6">6 years</option>
                  <option value="7">7 years</option>
                  <option value="8">8 years</option>
                  <option value="9">9 years</option>
                  <option value="10">10 years</option>
                </select>

                <p className="my-2">Fee</p>
                <input
                  className="py-1.5 block px-2 w-full border-2 border-gray-400 rounded-sm"
                  type="number"
                  {...register("fee")}
                  placeholder="Fee"
                />
              </div>

              {/* Right Column */}
              <div>
                <p className="my-2">Degree</p>
                <input
                  className="w-full py-1.5 px-3 border-2 rounded-sm border-gray-300"
                  {...register("degree")}
                  placeholder="Degree"
                />
                <p className="my-2">Speciality</p>
                <input
                  className="w-full py-1.5 px-3 border-2 rounded-sm border-gray-300"
                  {...register("speciality")}
                  placeholder="speciality"
                />

                <div className="flex flex-col gap-1.5 mt-2">
                  <p>Address</p>
                  <input
                    className="w-full py-1.5 px-3 border-2 rounded-sm border-gray-300"
                    {...register("address1")}
                    placeholder="Address 1"
                  />
                  <input
                    className="w-full py-1.5 px-3 border-2 rounded-sm border-gray-300"
                    {...register("address2")}
                    placeholder="Address 2"
                  />
                </div>
              </div>

              {/* Description full width */}
              <div className="col-span-2">
                <p className="my-2">Description</p>
                <textarea
                  className="block py-1.5 px-2 w-full border-2 border-gray-400 rounded-sm"
                  {...register("description")}
                  placeholder="Write about doctor"
                ></textarea>
              </div>

              {/* Submit button full width */}
              <div className="col-span-2">
                {isSubmitting ? (
                  <Lottie animationData={loader} loop={true} className="w-30 h-30" />
                ) : (
                  <button
                    className="py-1.5 px-6 rounded-full cursor-pointer text-white font-medium bg-blue-600"
                    type="submit"
                  >
                    Add a Doctor
                  </button>
                )}

              </div>
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default Add
