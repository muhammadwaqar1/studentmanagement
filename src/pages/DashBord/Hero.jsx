import React, { useEffect, useState } from 'react'
import { BsPersonVideo } from 'react-icons/bs';
import { BiBookReader } from 'react-icons/bi';
import { FcCheckmark } from 'react-icons/fc';
import { getCountFromServer } from 'firebase/firestore';
import { Count, attendence } from '../../firebase';

export default function Hero() {

  const [numberOfStudent, setNumberOfStudent] = useState()
const [numberOfCourses,setNumerOfCourses]=useState()
  const numberOfStudents = async () => {
    const snapshot = await getCountFromServer(Count);
    let numberOfStudents = snapshot.data().count
    const snapshots = await getCountFromServer(attendence);
    let numberOfCourses = snapshots.data().count
    setNumberOfStudent(numberOfStudents)
    setNumerOfCourses(numberOfCourses)
  }
  useEffect(() => {
    numberOfStudents()
  }, [])
  const data = [
    {
      name: "Total Students",
      numberOfStudent: "23",
      icon: <BsPersonVideo />,
      student: numberOfStudent,
      color: "green"
    },
    {
      name: " Total Courses",
      numberOfStudent: "23",
      icon: <BiBookReader />,
      student:numberOfCourses,
      color: "green"

    },
    // {
    //   name: "Attendece",
    //   numberOfStudent: "23",
    //   icon: <FcCheckmark />,
    // }
  ]
  return (
    <div className='w-full  bg-gray-200 h-[50%]'>
      <div className='flex justify-around'>

        {
          data.map((item, index) => {
            return (
              <div className='  w-[30%] h-[200px] flex my-2 flex-row bg-white rounded-md justify-between p-3 '>

                <div className=' w-full h-full bg-red-4000 p-3'>
                  <p className="text-4xl text-green-500" >{item.name}</p>
                  <p className='text-center  flex  items-center justify-center h-full text-2xl ' >{item.student}</p>
                </div>
                
              </div>

            )
          })
        }
      </div>
    </div>
  )
}
