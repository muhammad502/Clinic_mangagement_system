import { useState, useEffect } from "react";
import api from "../../servieces/api";
import { Toaster, toast } from "react-hot-toast";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", role: "" });

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", form);
      toast.success("User added successfully");
      setForm({ name: "", email: "", role: "" });
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-400 to-purple-600">
      <Toaster position="top-right" />
      <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-green-500 to-purple-600 bg-clip-text text-transparent">
          Manage Users
        </h2>

        {/* Add User Form */}
        <form onSubmit={handleAddUser} className="mt-6 space-y-4">
          <input
            className="w-full p-2 rounded-xl bg-white/60 border focus:ring-2 focus:ring-purple-500"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full p-2 rounded-xl bg-white/60 border focus:ring-2 focus:ring-purple-500"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <select
            className="w-full p-2 rounded-xl bg-white/60 border focus:ring-2 focus:ring-purple-500"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="super-admin">Super Admin</option>
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
            <option value="patient">Patient</option>
          </select>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl shadow-md hover:scale-105 transform transition-all duration-300"
          >
            Add User
          </button>
        </form>

        {/* User List */}
        <div className="mt-8">
          {loading ? (
            <p className="text-center text-gray-700">Loading users...</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-purple-100">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-300">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2 capitalize">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}