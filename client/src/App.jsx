import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import BaseLayout from './Pages/BaseLayout/BaseLayout';
import LeaveManagement from './modules/Admin/Pages/LeaveManagement/LeaveManagement';
import Login from './Pages/Login/Login'
import UserHeader from './modules/User/Components/UserHeader/UserHeader'
import UserSidebar from './modules/User/Components/UserSidebar/UserSidebar'
import UserBaseLayout from './modules/User/Components/UserBaselayout/UserBaselayout'
import ApplyLeave from './modules/User/Components/ApplyLeave/ApplyLeave'
import Profile from './modules/User/Components/Profile/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<BaseLayout />}>
          <Route path="leave-management" element={<LeaveManagement />} />
          {/* relative path! */}
        </Route>



                <Route path="/user" element={<UserBaseLayout />}>
                <Route path='applyleave' element={<ApplyLeave />}></Route>
                <Route path='profile' element={<Profile />}></Route>
                </Route>

      </Routes>
    </Router>
  );
}

export default App;
