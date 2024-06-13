import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import AdminLogin from "./Pages/UserManagement/Login/AdminLogin";
import StudentLogin from "./Pages/UserManagement/Login/StudentLogin";
import StudentRegister from "./Pages/UserManagement/Register/StudentRegister";
import { RequireAuth } from "./Pages/Layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-register" element={<StudentRegister />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
