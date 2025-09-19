import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SuperAdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="font-bold text-xl mb-6">Super Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <Link to="/super-admin" className="hover:underline">Dashboard</Link>
          <Link to="/super-admin/users" className="hover:underline">Manage Users</Link>
          <Link to="/super-admin/reports" className="hover:underline">Reports</Link>
          <Link to="/super-admin/settings" className="hover:underline">Settings</Link>
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
