import react from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './Pages/Login/Login'
import DepartmentCalendar from './Components/calender/Calender'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
         <Route path="/calender" element={<DepartmentCalendar/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
