import axios from "axios";
import { Children, createContext } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify"
import { useState, useEffect } from "react";



export const AppContext = createContext()
export const AppContextProvider = (props) => {
    const [doctors, setdoctors] = useState([])
    const [appointments, setappointments] = useState([])
    const [patients, setpatients] = useState([])
    

    const fetchDoctors = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/doctor/list")
            if (response.data.success) {
                setdoctors(response.data.doctors)
            }
            else {
                toast.error(response.data.error)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }
    const fetchAppointments = async () => {
        try {
            const response = await axios.post(backendUrl + "/api/user/listall-appointments")
            if (response.data.success) {
                setappointments(response.data.appointments)
            }
            else {
                toast.error(response.data.error)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }
    const fetchPatients = async () => {
        try {
            const response = await axios.post(backendUrl + "/api/user/allusers")
            if (response.data.success) {
                setpatients(response.data.patients)
            }
            else {
                toast.error(response.data.error)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }

    useEffect(() => {
        fetchDoctors()
        fetchAppointments()
        fetchPatients()
    }, [])

    const value = {
        doctors,appointments,patients
    }
    return (
        <AppContext.Provider value={value} >
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider