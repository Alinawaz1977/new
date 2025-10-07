import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DoctorContext } from "../Context/doctorContext";
import { assets } from "../assets/assets";
import ContactUs from "./ContactUs";
import { Title } from "../components/Title";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";

const DoctorPage = () => {
    const navigate = useNavigate()
    const { doctors, token } = useContext(DoctorContext);
    const { doctorid } = useParams();
    const [doctorinfo, setDoctorinfo] = useState(null);
    const [doctorSlots, setDoctorSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setslotTime] = useState('')
    const [relatedDoctors, setrelatedDoctors] = useState([])
    console.log(doctorSlots);




    const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const fetchDoctorInfo = () => {
        if (doctors.length > 0) {
            const foundedDoctor = doctors.find((item) => item._id === doctorid)
            setDoctorinfo(foundedDoctor)
        }
    }

    const fetchRelatedDoctor = () => {
        if (doctorinfo) {
            const foundRelatedDoctor = doctors.filter((item) => item.speciality === doctorinfo.speciality)
            setrelatedDoctors(foundRelatedDoctor)
        }
    }

    const getAvailableSlots = () => {
        setDoctorSlots([])
        // getting current date
        const today = new Date()
        // getting date with index
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting the end time of the date with index
            let endDate = new Date()
            endDate.setDate(today.getDate() + i)
            endDate.setHours(21, 0, 0, 0)
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            }
            else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }
            let timeSlot = []
            while (currentDate <= endDate) {
                let formatedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true })
                const day = currentDate.getDate()
                const month = currentDate.getMonth() + 1
                const year = currentDate.getFullYear()
                const slotTime = formatedTime
                const slotDate = day + "_" + month + "_" + year
                const slotAvailable = doctorinfo?.slots_Booked[slotDate] && doctorinfo.slots_Booked[slotDate].includes(slotTime) ? false : true;
                if (slotAvailable) {
                    timeSlot.push({
                        datetime: new Date(currentDate),
                        time: formatedTime
                    })
                }
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            if (timeSlot.length > 0) {
                setDoctorSlots(prev => ([...prev, timeSlot]))
            }
        }
    }

    const bookAppointments = async () => {
        if (!token) {
            toast.warn("login to book appointment")
            return navigate("/login")
        }
        if (!slotTime) {
            toast.warn("Select time for slot")
            return
        }
        try {
            const date = doctorSlots[slotIndex][0].datetime
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            const slotDate = day + "_" + month + "_" + year
            const response = await axios.post(backendUrl + '/api/user/book-appointment', { slotDate, slotTime, doctorid }, { headers: { token } })
            if (response.data.success) {
                navigate('/myappointments')
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(() => {
        fetchDoctorInfo()
        fetchRelatedDoctor()
    }, [doctors, doctorid])
    useEffect(() => {
        if (doctorinfo) {
            getAvailableSlots()
        }
    }, [doctorinfo])
    useEffect(() => {
        console.log(doctorSlots);
    }, [doctorSlots])




    return doctorinfo && (
        <>
            <div className="flex flex-col sm:flex-row gap-2 mt-5">
                <div className="w-[250px] h-[250px] shrink-0 bg-blue-600 rounded-xl">
                    <img
                        className="w-[250px] h-[250px] object-cover rounded-xl"
                        src={doctorinfo.image}
                        alt={doctorinfo.name}
                    />
                </div>
                <div>

                    <div className="border w-full border-gray-400 rounded-xl p-5 sm:w-[60vw]">
                        <p className="text-2xl font-medium">{doctorinfo.name}</p>
                        <p className="text-gray-600">
                            {doctorinfo.degree} - {doctorinfo.speciality}
                            <span className="border border-gray-400 rounded-2xl p-1 px-2 ml-2">
                                {doctorinfo.experience} years
                            </span>
                        </p>

                        <p className="flex gap-1 mt-2 items-center">
                            About <img className="w-3" src={assets.info_icon} alt="info" />
                        </p>

                        <p className="text-gray-700">{doctorinfo.description}</p>
                        <p className="mt-4 text-base font-medium">
                            Appointment fee: ${doctorinfo.fee}
                        </p>
                    </div>
                    <div className=" w-full sm:w-[60vw]  " >

                        <div className="mt-4 text-2xl font-medium " >
                            <p>Booking Slots</p>
                        </div>
                        <div className="flex gap-4 mt-2 overflow-x-scroll scroll-smooth  " >
                            {
                                doctorSlots.length && doctorSlots.map((item, index) => (
                                    <div onClick={() => setSlotIndex(index)} key={index} className={`shrink-0 w-16 cursor-pointer border border-gray-200 rounded-full py-4 flex flex-col justify-center items-center ${slotIndex === index ? "bg-blue-600 text-white font-medium " : null}`} >
                                        <p>{item[0] && item[0].datetime.getDate()}</p>
                                        <p>{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
                                    </div>
                                ))

                            }
                        </div>
                        <div className="flex   gap-1.5  mt-4 horizontal-scroll scrollbar-hide " >
                            {
                                doctorSlots.length && doctorSlots[slotIndex].map((item, index) => (
                                    <p onClick={() => setslotTime(item.time)} className={`${slotTime === item.time ? "bg-blue-600 text-white font-medium " : null} border border-gray-300 py-1 cursor-pointer px-2 rounded-full `} key={index} >{item.time.toLowerCase()}</p>
                                ))
                            }
                        </div>
                        <div>
                            <button onClick={bookAppointments} className="w-full sm:w-60 px-2 py-2 rounded-full bg-blue-600 cursor-pointer text-white mt-5" >Book an Appointment</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-25 justify-center items-center " >
                <Title text1={"Related Doctors "} />
                <p>Simply browse through our extensive list of trusted doctors.</p>
                <div className="flex gap-3" >

                    {
                        relatedDoctors.map((doctor, index) => (
                            <Link to={`/doctors/${doctor._id}`} >
                                <div onClick={() => navigate(`/doctors/${doctor._id}`, scrollTo(0, 0))} className='border mt-10 hover:transform hover:translate-y-[-10px]  transition-all duration-300 h-fit  w-fit cursor-pointer rounded-md border-gray-300' >
                                    <div className=' rounded-md w-[240px] bg-[#eaefff] transition-all duration-500  h-[240px] ' >
                                        <img loading='lazy' className='w-[240px] h-[240px] object-cover ' src={doctor.image} alt="" />
                                    </div>
                                    <div className='ml-4' >
                                        <div className='flex items-center text-green-500 gap-3 mt-3' >
                                            <p className='font-black bg-green-500 h-2 w-2 rounded-full' ></p>
                                            <p>available</p>
                                        </div>
                                        <p className='text-xl' >{doctor.name}</p>
                                        <p className='pb-2 text-gray-400 text-sm' >{doctor.speciality}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default DoctorPage;
