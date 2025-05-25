import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import BaseLayout from './Pages/BaseLayout/BaseLayout';
import LeaveManagement from './modules/Admin/Pages/LeaveManagement/LeaveManagement';

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
      </Routes>
    </Router>
  );
}

export default App;
