import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DoctorLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-green-100 p-4 border-r">
        <h2 className="font-bold text-xl mb-6">Doctor Panel</h2>
        <nav className="flex flex-col space-y-3">
          <Link to="/doctor" className="hover:underline">Dashboard</Link>
          <Link to="/doctor/appointments" className="hover:underline">Appointments</Link>
          <Link to="/doctor/patients" className="hover:underline">My Patients</Link>
          <Link to="/doctor/profile" className="hover:underline">Profile</Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-6 text-red-600 hover:underline"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
