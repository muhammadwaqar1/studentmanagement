import { Input, Modal, Table } from 'antd';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from "../../firebase"
import { message } from 'antd';
import Column from 'antd/es/table/Column';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';

import { useStore } from "../../store"
import "./style.css";
const initialFormState = {
  courseName: "",
  courseCode: "",
  description: "",
};
export default function Hero({ setIsModalOpen, isModalOpen }) {
  const { courses, addCourses } = useStore()

  const [user, setUser] = useState(initialFormState);
  const [studentId, setStudentId] = useState("")
  const getData = async () => {
    try {
      const q = query(collection(db, "courses"))
      const querySnapshot = await getDocs(q);
      const array = []
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        array.push(data)
        addCourses(array)
      });
    } catch (error) {
      console.log(error)
      message.error("please connect to Internet")
      return () => getData()
    }
  }
  useEffect(() => {
    getData()
  }, [])

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const HandleaddCourses = async () => {

    if (!user.courseName || !user.courseCode || !user.description) {
      return;
    }

    const venue = {
      courseName: user.courseName,
      courseCode: user.courseCode,
      description: user.description,
    };

    try {
      if (studentId) {
        await updateDoc(doc(db, "courses", studentId), venue);
        setStudentId("")
      } else {
        const VenueId = Math.random().toString(36).substring(2);
        await setDoc(doc(db, "courses", VenueId), {
          ...venue,
          id: VenueId,
        });
      }
    } catch (error) {
      console.log(error, "error");
    }

    getData();
    setIsModalOpen(false);
    setUser(initialFormState);
  };
  const handleDeleteStudent = async (id) => {
    try {
      await deleteDoc(doc(db, "courses", id));
      const newBlogs = courses.filter((blog) => blog.id != id);
      console.log(newBlogs, "sdfsd")
      addCourses(newBlogs);
    } catch (error) {
      console.error("Error removing document(s): ", error);
    }
  };
  const EditVenue = async (dishId) => {
    setStudentId(dishId)
    setIsModalOpen((prevState) => !prevState);
    const docRef = doc(db, "courses", dishId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  console.log(courses, "dddddd")
  return (
    <>
      <Table dataSource={courses} className="myTable">
        <Column title="CourseCode" dataIndex="courseCode" key="courseCode" />
        <Column
          title="Course Name"
          dataIndex="courseName"
          key="courseName"
        />
        <Column
          title="Description"
          dataIndex="description"
          key="description"
        />
        <Column
          title="Action"
          dataIndex="id"
          key="id"
          render={(venueId) => (
            <div className=' flex'>
              <div className='text-xl text-green-500'>

                <AiOutlineDelete
                  onClick={() => handleDeleteStudent(venueId)}
                />
              </div>
              <div className='text-xl pl-3 text-red-500'>

                <AiOutlineEdit onClick={() => EditVenue(venueId)} />
              </div>
            </div>
          )}
        />
      </Table>
      <Modal title="Basic Modal" open={isModalOpen} onOk={() => {
        HandleaddCourses()
      }} onCancel={handleCancel}>
        <div className="flex flex-col items-start relative md:mt-3 mt-4">
          <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[120.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
            <p className="absolute text-lg leading-[100%] z-20 pt-1">
              Course Name
            </p>
          </div>
          <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
            <Input
              placeholder="Course Name"
              type="text"
              name="courseName"
              value={user.courseName}
              onChange={handleChange}
              className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
            />
          </div>
        </div>
        <div className="flex flex-col items-start relative md:mt-3 mt-4">
          <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[110.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
            <p className="absolute text-lg leading-[100%] z-20 pt-1">
            Course Code
            </p>
          </div>
          <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
            <Input
              placeholder="Name"
              type="text"
              name="courseCode"
              value={user.courseCode}
              onChange={handleChange}
              className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
            />
          </div>
        </div>
        <div className="flex flex-col items-start relative md:mt-3 mt-4">
          <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[110.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
            <p className="absolute text-lg leading-[100%] z-20 pt-1">
              Description
            </p>
          </div>
          <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
            <Input
              placeholder="description"
              type="text"
              name="description"
              value={user.description}
              onChange={handleChange}
              className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
