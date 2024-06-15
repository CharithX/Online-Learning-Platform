import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
function AdminCreateCourse() {
  const { adminToken } = useAuth(); // Access adminToken from AuthContext
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [price, setPrice] = useState(0.0);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleModuleCodeChange = (e) => {
    setModuleCode(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(parseFloat(e.target.value)); // Convert to float for price
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to backend API
    const formData = {
      title: title,
      description: description,
      moduleCode: moduleCode,
      price: price,
    };

    console.log("Form submitted with data:", formData);

    try {
      // Sending data to backend using Axios
      const response = await axios.post(
        "http://localhost:3000/api/admins/courses",
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`, // Attach admin token in Authorization header
          },
        }
      );

      // Show success message using SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Course Created Successfully!",
        showConfirmButton: false,
        timer: 1500, // Automatically close after 1.5 seconds
      });

      // Clear form fields after successful submission
      setTitle("");
      setDescription("");
      setModuleCode("");
      setPrice(0.0);

      console.log("Course created successfully:", response.data);
    } catch (error) {
      // Show error message using SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create course.",
      });

      console.error("Failed to create course:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Create Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              rows="3"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Module Code:
            </label>
            <input
              type="text"
              value={moduleCode}
              onChange={handleModuleCodeChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price:
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={handlePriceChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminCreateCourse;
