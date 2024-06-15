import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminUpdateCourse = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: "",
    moduleCode: "",
    description: "",
    availability: false,
    price: 0,
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/admins/courses/${id}`
        );
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/admins/courses/${id}`, course);

      // Show success message to the user
      Swal.fire({
        icon: "success",
        title: "Update successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/admin-courses-list");
    } catch (error) {
      console.error("Error updating course:", error);
      // Show error message to the user
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update course. Please try again later.",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (e) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      availability: e.target.value === "true",
    }));
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-2/3 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Update Course: {course.title} - {course.moduleCode}
        </h1>

        <form onSubmit={handleUpdateCourse}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={course.title}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="moduleCode"
              className="block text-sm font-medium text-gray-700"
            >
              Module Code
            </label>
            <input
              type="text"
              id="moduleCode"
              name="moduleCode"
              value={course.moduleCode}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={course.description}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="availability"
              className="block text-sm font-medium text-gray-700"
            >
              Availability
            </label>
            <select
              id="availability"
              name="availability"
              value={course.availability ? "true" : "false"}
              onChange={handleAvailabilityChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={course.price}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md mr-2"
            >
              Update Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateCourse;
