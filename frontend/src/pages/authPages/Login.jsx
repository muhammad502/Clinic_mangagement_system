import { useState } from "react";
import api from "../../servieces/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      login(res.data); // saves user + token in context + localStorage

      toast.success("Login successful");

      // redirect based on role
      switch (res.data.user.role) {
        case "super-admin":
          navigate("/super-admin");
          break;
        case "doctor":
          navigate("/doctor");
          break;
        case "receptionist":
          navigate("/receptionist");
          break;
        case "patient":
          navigate("/patient");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-green-500 text-white p-2 w-full">Login</button>
      </form>

      <div className="flex justify-between text-sm text-blue-600">
        <button
          onClick={() => navigate("/forgetPassword")}
          className="hover:underline"
        >
          Forgot Password?
        </button>
        <button
          onClick={() => navigate("/register")}
          className="hover:underline"
        >
          Don’t have an account? Register
        </button>
      </div>
    </div>
  );
}
