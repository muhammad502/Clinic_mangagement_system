import { useState } from "react";
import api from "../../servieces/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const customToast = (message) => {
    toast.success(message, {
      style: {
        background: "rgba(255, 255, 255, 0.9)",
        color: "#16a34a",
        fontWeight: "600",
        borderRadius: "12px",
        padding: "12px 16px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
      },
      iconTheme: {
        primary: "#16a34a",
        secondary: "#fff",
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await api.post("/auth/login", form);

      login(res.data); // saves user + token in context + localStorage

      customToast("Login successful");

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
      setErrors({ general: err.response?.data?.message || "Login failed" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-purple-600 p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-sm bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-green-500 to-purple-600 bg-clip-text text-transparent">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <input
              className={`border p-2 w-full rounded-xl bg-white/60 focus:ring-2 focus:ring-purple-500 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              className={`border p-2 w-full rounded-xl bg-white/60 focus:ring-2 focus:ring-purple-500 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="text-red-600 text-sm text-center">{errors.general}</p>
          )}

          <button
            className="w-full py-3 bg-gradient-to-r from-green-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 transform transition-all duration-300"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between text-sm text-purple-700 mt-4">
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
    </div>
  );
}