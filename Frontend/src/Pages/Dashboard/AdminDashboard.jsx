import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="flex flex-col items-center">
      {/* Logout button */}
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 self-end mr-4">
        Logout
      </button>

      {/* Admin Dashboard title */}
      <h1 className="text-3xl font-semibold mt-4 mb-8">Admin Dashboard</h1>

      {/* Cards container */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-screen-lg">
        {/* Course card */}
        <div className="bg-blue-100 text-blue-900 overflow-hidden shadow-lg rounded-lg p-12 flex flex-col justify-between">
          <div>
            <Link to="/admin-courses-list">
              <div className="text-2xl font-semibold text-center">Course</div>
            </Link>
          </div>
        </div>

        {/* Users card */}
        <div className="bg-green-100 text-green-900 overflow-hidden shadow-lg rounded-lg p-12 flex flex-col justify-between">
          <div>
            <div className="text-2xl font-semibold text-center">Users</div>
          </div>
        </div>

        {/* Enrollment card */}
        <div className="bg-yellow-100 text-yellow-900 overflow-hidden shadow-lg rounded-lg p-12 flex flex-col justify-between">
          <div>
            <div className="text-2xl font-semibold text-center">Enrollment</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
