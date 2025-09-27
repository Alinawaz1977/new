import { createContext, useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify"; // only if you're using react-toastify
import { backendUrl } from "../App";

// Context
export const DoctorContext = createContext();

// Provider Component
export const DoctorContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [filter, setfilter] = useState(false)
    const [token, settoken] = useState(localStorage.getItem("token")||null)

    

    const fetchDoctors = async () => {
        try {
            const response = await axios.get( backendUrl+ "/api/doctor/list");
            if (response.data.success) {
                setDoctors(response.data.doctors);
            } else {
                toast.error(response.error.message);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, [doctors]);

    const value = {
        doctors,filter,setfilter,token,settoken
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
