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
  name: "",
  fatherName: "",
  number: "",
};
export default function Hero({ setIsModalOpen, isModalOpen }) {
  const { student, addStudent } = useStore()

  const [user, setUser] = useState(initialFormState);
  const [studentId, setStudentId] = useState("")
  const getData = async () => {
    try {
      const q = query(collection(db, "student"))
      const querySnapshot = await getDocs(q);
      const array = []
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        array.push(data)
        addStudent(array)
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
  const HandleaddVenue = async () => {

    if (!user.name || !user.fatherName || !user.number) {
      return;
    }

    const venue = {
      name: user.name,
      fatherName: user.fatherName,
      number: user.number,
    };

    try {
      if (studentId) {
        await updateDoc(doc(db, "student", studentId), venue);
        setStudentId("")
      } else {
        const VenueId = Math.random().toString(36).substring(2);
        await setDoc(doc(db, "student", VenueId), {
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
    // if (
    //   !user.name ||
    //   !user.fatherName ||
    //   !user.number
    // ) {
    //   return;
    // }
    // const VenueId = Math.random().toString(36).substring(2);
    // const venue = {
    //   name: user.name,
    //   fatherName: user.fatherName,
    //   number: user.number,
    //   id: VenueId
    // };
    // try {
    //   await setDoc(doc(db, "student", VenueId), venue);
    // } catch (error) {
    //   console.log(error, "error");
    // }
    // getData()
    // setIsModalOpen(false);
    // setUser(initialFormState)

  };
  const handleDeleteStudent = async (id) => {
    try {
      await deleteDoc(doc(db, "student", id));
      const newBlogs = student.filter((blog) => blog.id != id);
      console.log(newBlogs, "sdfsd")
      addStudent(newBlogs);
    } catch (error) {
      console.error("Error removing document(s): ", error);
    }
  };
  const EditVenue = async (dishId) => {
    setStudentId(dishId)
    setIsModalOpen((prevState) => !prevState);
    const docRef = doc(db, "student", dishId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  console.log(studentId, "kkkk")
  return (
    <>
      <Table dataSource={student} className="myTable">
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Father Name"
          dataIndex="fatherName"
          key="fatherName"
        />
        <Column
          title="Number"
          dataIndex="number"
          key="number"
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
        HandleaddVenue()
      }} onCancel={handleCancel}>
        <div className="flex flex-col items-start relative md:mt-3 mt-4">
          <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
            <p className="absolute text-lg leading-[100%] z-20 pt-1">
              Name
            </p>
          </div>
          <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
            <Input
              placeholder="Name"
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
            />
          </div>
        </div>
        <div className="flex flex-col items-start relative md:mt-3 mt-4">
          <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[110.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
            <p className="absolute text-lg leading-[100%] z-20 pt-1">
              Father Name
            </p>
          </div>
          <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
            <Input
              placeholder="Name"
              type="text"
              name="fatherName"
              value={user.fatherName}
              onChange={handleChange}
              className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
            />
          </div>
        </div>
        <div className="flex flex-col items-start relative md:mt-3 mt-4">
          <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[70.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
            <p className="absolute text-lg leading-[100%] z-20 pt-1">
              Number
            </p>
          </div>
          <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
            <Input
              placeholder="Number"
              type="number"
              name="number"
              value={user.number}
              onChange={handleChange}
              className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
