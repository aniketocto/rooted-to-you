import React from 'react'
import './thanks.css'

const page = () => {
  return (
    <section className='flex flex-col items-center justify-center h-[60vh] text-center'>
         <img
          src="/images/decorative.png"
          className="absolute top-0 -z-1 h-[500px] md:w-full object-cover"
          alt=""
        />
        <h1 className="thanks-head">Thank You</h1>
        <p className='thanks-text'>Excited to serve you Rooted meals.</p>
        
    </section>
  )
}

export default page