        import React from 'react'
        import { assets } from '../assets/assets'
        import { useState } from 'react'
        import { NavLink } from "react-router-dom"
        import { useContext } from 'react'
        import { AppContext } from '../Context/AppContext'
        const MobileSidebar = () => {
            const [visible, setvisible] = useState(false)
            const { token } = useContext(AppContext)
            return (
                <>{
                    token && <div className='' >
                        <img onClick={() => setvisible(true)} className='w-5 fixed z-30 right-5  block sm:hidden mt-5' src={assets.menuicon} alt="" />
                        <div className={`top-0 z-30 absolute bottom-0 mt-5 right-0 overflow-hidden transition-all  bg-white ${visible ? "w-full" : "w-0"}`} >
                            <div>
                                <button onClick={() => setvisible(false)} className='flex px-2.5 gap-1.5 my-3'> <img className='rotate-180' src={assets.arrow_icon} alt="" />Back</button>
                                <ul className='flex flex-col ' >
                                    <NavLink onClick={() => setvisible(false)} to={"/dashboard"} className='border-t border-gray-300 px-2 py-2' >Dashboard</NavLink>
                                    <NavLink onClick={() => setvisible(false)} to={"/appointments"} className='border-t border-gray-300 px-2 py-2' >appointments</NavLink>
                                    <NavLink onClick={() => setvisible(false)} to={"/add"} className='border-t border-gray-300 px-2 py-2' >add a new docotor</NavLink>
                                    <NavLink onClick={() => setvisible(false)} to={"/listdoctor"} className='border-t border-gray-300 px-2 py-2' >Doctor list</NavLink>
                                </ul>
                            </div>
                        </div>
                    </div>
                }

                </>
            )
        }

        export default MobileSidebar