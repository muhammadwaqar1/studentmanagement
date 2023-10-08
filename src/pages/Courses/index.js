import React, { useState } from 'react'
import Hero from './Hero'

export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='w-4/5 '>
      <div className="flex md:px-5 border rounded-md justify-between  items-center px-4 my-5 mx-5 w-full">
        <p className="md:text-2xl py-3">Courses</p>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center">
            <button
              className="border rounded-md py-2 px-1 md:px-2 mr-2 pont-poppins text-primary border-primary  md:py-2"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="flex">
                <p className=" text-xs md:text-base">Add Courses</p>
              </span>
            </button>
          </div>
        </div> 
      </div>
      <div className='pl-10'>
        <Hero
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  )
}
