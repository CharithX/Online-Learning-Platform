import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import AdminLogin from "./Pages/UserManagement/Login/AdminLogin";
import StudentLogin from "./Pages/UserManagement/Login/StudentLogin";
import StudentRegister from "./Pages/UserManagement/Register/StudentRegister";
import StudentDashboard from "./Pages/Dashboard/StudentDashboard";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import AdminCreateCourse from "./Pages/CourseManagement/AdminCreateCourse";
import AdminListCourse from "./Pages/CourseManagement/AdminListCourse";
import AdminUpdateCourse from "./Pages/CourseManagement/AdminUpdateCourse";
import UserCoursesView from "./Pages/CourseManagement/UserCoursesView";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/courses-create" element={<AdminCreateCourse />} />
        <Route path="/admin-courses-list" element={<AdminListCourse />} />
        <Route path="/update/:id" element={<AdminUpdateCourse />} />
        <Route path="/courses-list" element={<UserCoursesView />} />
      </Routes>
    </Router>
  );
}

export default App;
