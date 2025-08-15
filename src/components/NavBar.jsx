import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex gap-6 font-semibold text-lg">
        <Link to="/expenses" className="hover:text-gray-300">
          Main Page
        </Link>
        <Link to="/dashboard" className="hover:text-gray-300">
          Dashboard
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-white text-green-700 px-4 py-2 rounded hover:bg-gray-200 font-semibold"
      >
        Logout
      </button>
    </nav>
  );
}
