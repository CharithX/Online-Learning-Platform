import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-3xl font-bold mb-8">Welcome to Home Education</div>

      <div className="flex space-x-4">
        <Link
          to="/student-login"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
        >
          Student
        </Link>
        <Link
          to="/admin-login"
          className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700"
        >
          Admin
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
