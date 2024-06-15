
import  { useState } from "react";

import CourseCard from "../../Components/CourseCard/CourseCard";
import EnrollmentCard from "../../Components/EnrollmentCard/EnrollmentCard";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
     const naviagte = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showEnrollments, setShowEnrollments] = useState(false);

  const courses = [
    { id: 1, name: "Math 101", description: "Basic Mathematics" },
    { id: 2, name: "History 201", description: "World History" },
    // Add more courses as needed
  ];

  const enrollCourse = (course) => {
    setEnrolledCourses([...enrolledCourses, course]);
  };

const handleLogout = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      credentials: "include", // send cookies
    });

    if (response.ok) {
      console.log("Logged out successfully");
      Swal.fire({
        icon: "success",
        title: "Logout successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      naviagte("/")
    } else {
      console.error("Logout failed:", response.statusText);
      Swal.fire({
        icon: "error",
        title: "Logout failed",
        text: "Something went wrong. Please try again later.",
        confirmButtonText: "OK",
      });
    }
  } catch (error) {
    console.error("Logout failed:", error.message);
    Swal.fire({
      icon: "error",
      title: "Logout failed",
      text: "Something went wrong. Please try again later.",
      confirmButtonText: "OK",
    });
  }
};

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold m-4 ">Student Dashboard</h1>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 left-0"
        >
          Log Out
        </button>
      </div>
      <h2 className="text-2xl font-semibold my-4">Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onEnroll={enrollCourse} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 mt-8">Enrollments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {enrolledCourses.map((course) => (
          <EnrollmentCard key={course.id} enrollment={course} />
        ))}
      </div>

      <button
        onClick={() => setShowEnrollments(!showEnrollments)}
        className="mt-8 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {showEnrollments ? "Hide Enrollments" : "Show Enrollments"}
      </button>
    </div>
  );
};

export default StudentDashboard;
