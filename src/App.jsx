import './App.css';
import SideBar from "./pages/SideBar"
import { Route, Routes } from 'react-router-dom';
import DashBord from "./pages/DashBord"
import Student from "./pages/Student"
import Courses from "./pages/Courses"
import Attendance from "./pages/Attendance"

function App() {
  return (
    <div className="App">
      <div className='flex'>
        <SideBar />
        <Routes>
          <Route path='/' element={<DashBord />} />
          <Route path='/student' element={<Student />} />
          <Route path='/attendence' element={<Attendance />} />
          <Route path='/course' element={<Courses />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
