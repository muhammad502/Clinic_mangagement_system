import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PatientLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();             // clear auth context + localStorage
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-100 p-4">
        <h2 className="font-bold text-xl mb-4">Patient Panel</h2>
        <p className="mb-2 text-sm text-gray-600">Welcome, {user?.name}</p>
        <nav className="space-y-2 flex flex-col">
          <Link to="/patient">Home</Link>
          <Link to="/patient/appointments">My Appointments</Link>
          <Link to="/patient/profile">Profile</Link>
          <Link to="/patient/billing">Billing</Link>
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
