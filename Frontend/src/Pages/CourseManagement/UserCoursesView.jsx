import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function UserCoursesView() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Function to fetch data using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/courses"
        );
        setCourses(response.data); // Assuming the API returns an array of course objects
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures it runs only once when component mounts

  const handleEnrollClick = () => {
    Swal.fire({
      icon: "success",
      title: "Update successful!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mt-4 mb-8">
        Course List for Students
      </h1>

      <div className="grid grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
             className="bg-blue-100 text-blue-900 overflow-hidden shadow-lg rounded-lg p-6 md:p-12 flex flex-col justify-between">
            <div>
              <div className="text-2xl font-bold mb-2">{course.title}</div>
              <div className="text-lg text-gray-700 mb-2">
                {course.moduleCode}
              </div>
              <div className="text-lg text-gray-700 mb-2">
                {course.description}
              </div>
              <div className="text-lg text-gray-700 mb-4">{course.price}</div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleEnrollClick}
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCoursesView;
