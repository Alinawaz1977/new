import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DoctorContext } from "../Context/doctorContext";
import { assets } from "../assets/assets";
import ContactUs from "./ContactUs";
import { Title } from "../components/Title";

const DoctorPage = () => {
    const { doctors } = useContext(DoctorContext);
    const { doctorid } = useParams();
    const [doctorinfo, setDoctorinfo] = useState(null);
    const [doctorSlots, setDoctorSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setslotTime] = useState('')
    const [relatedDoctors, setrelatedDoctors] = useState([])
    const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const fetchDoctorInfo = () => {
        if (doctors.length > 0) {
            const foundedDoctor = doctors.find((item) => item._id === doctorid)
            setDoctorinfo(foundedDoctor)
        }
    }

    const fetchRelatedDoctor=()=>{
        const foundRelatedDoctor= doctors.find((item)=>item.speciality===doctorinfo.speciality)
        console.log(foundRelatedDoctor);
        
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
            endDate.setHours(21, 0, 30, 0)
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            }
            else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }
            let timeSlot = []
            while (currentDate < endDate) {
                let formatedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
                timeSlot.push({
                    datetime: new Date(currentDate),
                    time: formatedTime
                })
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            setDoctorSlots(prev => ([...prev, timeSlot]))
        }
    }
    

    useEffect(() => {
        fetchDoctorInfo()
        fetchRelatedDoctor()
    }, [doctors, doctorid])
    useEffect(() => {
        getAvailableSlots()
    }, [doctorid])
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
                                    <p onClick={() => setslotTime(index)} className={`${slotTime === index ? "bg-blue-600 text-white font-medium " : null} border border-gray-300 py-1 cursor-pointer px-2 rounded-full `} key={index} >{item.time.toLowerCase()}</p>
                                ))
                            }
                        </div>
                        <div>
                            <button className="w-full sm:w-60 px-2 py-2 rounded-full bg-blue-600 cursor-pointer text-white mt-3" >Book an Appointment</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Title text1={"Related Doctors "} />
                <p>Simply browse through our extensive list of trusted doctors.</p>
                {

                }
            </div>
        </>
    );
};

export default DoctorPage;
