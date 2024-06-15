import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AdminListCourse = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admins/courses"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  const toggleAccordion = (index) => {
    setCourses((prevCourses) =>
      prevCourses.map((course, i) =>
        i === index ? { ...course, isOpen: !course.isOpen } : course
      )
    );
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admins/courses/${id}`);

      // Remove the deleted course from the local state
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== id)
      );

      // Show success message to the user
      Swal.fire({
        icon: "success",
        title: "Delete successful!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error deleting course:", error);
      // Show error message to the user
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete course. Please try again later.",
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-2/3 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Admin List of Courses
        </h1>

        <Link to="/courses-create">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mb-5 rounded-md shadow-md">
            Add Course
          </button>
        </Link>

        {courses.map((course, index) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md mb-4">
            <button
              className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <h2 className="text-lg font-semibold">
                {course.title} - {course.moduleCode}
              </h2>
              <div className="flex space-x-2">
                <Link to={`/update/${course.id}`}>
                  <BiSolidEditAlt className="text-blue-600 cursor-pointer" />
                </Link>
                <MdDelete
                  className="text-red-600 cursor-pointer"
                  onClick={() => handleDeleteCourse(course.id)}
                />
              </div>
            </button>
            {course.isOpen && (
              <div className="p-4">
                <p className="text-gray-600">
                  <strong>Title:</strong> {course.title}
                </p>
                <p className="text-gray-600">
                  <strong>Module Code:</strong> {course.moduleCode}
                </p>
                <p className="text-gray-600">
                  <strong>Description:</strong> {course.description}
                </p>
                <p className="text-gray-600">
                  <strong>Availability:</strong>{" "}
                  {course.availability ? "Yes" : "No"}
                </p>
                <p className="text-gray-600">
                  <strong>Price:</strong> {course.price}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminListCourse;
