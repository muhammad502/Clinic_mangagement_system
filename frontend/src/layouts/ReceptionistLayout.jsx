import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ReceptionistLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-100 p-4 border-r">
        <h2 className="font-bold text-xl mb-6">Receptionist Panel</h2>
        <nav className="flex flex-col space-y-3">
          <Link to="/receptionist" className="hover:underline">Dashboard</Link>
          <Link to="/receptionist/appointments" className="hover:underline">Appointments</Link>
          <Link to="/receptionist/patients" className="hover:underline">Patients</Link>
          <Link to="/receptionist/billing" className="hover:underline">Billing</Link>
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
