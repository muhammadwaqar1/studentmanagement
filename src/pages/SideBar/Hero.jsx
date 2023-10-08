import React, { useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai';
import { BsPersonVideo } from 'react-icons/bs';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { BiBookReader } from 'react-icons/bi';
import { FcCheckmark } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const data = [
  {
    name: "Dashord",
    icon: <AiOutlineHome />,
    link: "/"

  },
  {
    name: "Student",
    icon: <BsPersonVideo />,
    link: "/student"

  },
  {
    name: "Attendence",
    icon: <FcCheckmark />,
    link: "/attendence"

  },
  {
    name: "Courses",
    icon: <BiBookReader />,
    link: "/course"

  }

]
export default function Hero({ setCollapsed, collapsed }) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  return (
    <div className='w-[100%] border-r-2 h-[100vh]'>
      <div className='flex justify-between p-3'>
        {!collapsed && <p className='text-primary '>Studet Protal</p>}
        <div className=''>
          {
            collapsed ? (
              <div onClick={() => setCollapsed(false)} className='ml-4 text-2xl'>
                <AiOutlineMenuFold />
              </div>
            ) : (
              <div onClick={() => setCollapsed(true)} className='ml-4 text-2xl'>
                <AiOutlineMenuUnfold />
              </div>
            )
          }
        </div>
      </div>
      {
        data.map((item, index) => {
          return (
            <Link to={item.link} key={index}>
              <div
                className={`justify-center my-3 py-2  ${selectedItemIndex === index ? 'bg-primary' : '' // Change the background color based on the selectedItemIndex
                  }`}
                onClick={() => setSelectedItemIndex(index)}
              >
                <p className="px-3 flex">
                  <span className="pr-2 text-2xl"> {item.icon}</span>
                   {!collapsed && item.name}
                </p>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}


