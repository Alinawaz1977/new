import React from 'react'
import Add from './components/Add'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './components/AdminLogin'
import { useEffect } from 'react'

const App = () => {
  const [token, setToken] = useState('')
  return (
    <>
    {
      token===''?<AdminLogin/>:""
    }
    <Navbar/>
    <div className='flex bg-slate-100 gap-6 border-b h-screen  border-gray-400 ' >
      {/* <Sidebar/> */}
      <Routes>
        <Route path='/adminlogin' element={<AdminLogin/>} />
        <Route path='/add' element={<Add/>} />
      </Routes>
    </div>
    </>
  )
}

export default App