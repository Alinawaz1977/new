import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <p className=' font-bold text-2xl text-center mt-3 text-blue-600' >{text1} <span className='text-2xl   text-black font-bold' >{text2}</span></p>
  )
}

export default Title