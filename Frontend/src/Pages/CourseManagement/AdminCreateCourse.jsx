import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminCreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [price, setPrice] = useState(0.0);
  const navigate = useNavigate();

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
    setPrice(parseFloat(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      moduleCode,
      price,
    };

    console.log("Form submitted with data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admins/courses",
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Course Created Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setTitle("");
      setDescription("");
      setModuleCode("");
      setPrice(0.0);

      console.log("Course Created Successfully:", response.data);

      navigate("/admin-courses-list");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create course.",
      });

      console.error("Failed to create course:", error);
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="w-full md:w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Course</h2>
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
              required
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
              required
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
              required
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
              className="mt-1 w-full px-4 py-2 "
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md mr-2"
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
