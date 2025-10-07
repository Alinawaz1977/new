import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DoctorContext } from '../Context/doctorContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl } from '../App'
import { useEffect } from 'react'

const Verify = () => {
    const { token } = useContext(DoctorContext)
    const [searchParams, setsearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const docid = searchParams.get("docid")
    const navigate = useNavigate()

    const verifypayment = async () => {
        try {
            if (!token) {
                return null
            }
            const response = await axios.post(backendUrl + "/api/user/verify", { success, docid }, { headers: { token } })
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/myappointments")
            }
            else {
                toast.error(response.data.message)
                navigate("/myappointments")
            }
        } catch (error) {
            toast.error(error.message)
        }

    }
    useEffect(() => {
        verifypayment()
    }, [token])
    return (
        <div>

        </div>
    )
}

export default Verify