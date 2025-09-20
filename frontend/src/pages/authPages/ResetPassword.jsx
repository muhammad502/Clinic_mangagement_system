import { useState } from "react";
import api from "../../servieces/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const [form, setForm] = useState({ otp: "", newPassword: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.otp) newErrors.otp = "OTP is required";
    if (!form.newPassword) newErrors.newPassword = "New password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      await api.post("/auth/reset-password", form);
      toast.success("Password reset successful", {
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
      navigate("/login");
    } catch (err) {
      setErrors({ general: err.response?.data?.message || "Reset failed" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-purple-600 p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-sm bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-green-500 to-purple-600 bg-clip-text text-transparent">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <input
              className={`border p-2 w-full rounded-xl bg-white/60 focus:ring-2 focus:ring-purple-500 ${
                errors.otp ? "border-red-500" : ""
              }`}
              placeholder="Enter OTP"
              value={form.otp}
              onChange={(e) => setForm({ ...form, otp: e.target.value })}
            />
            {errors.otp && <p className="text-red-600 text-sm mt-1">{errors.otp}</p>}
          </div>

          <div>
            <input
              className={`border p-2 w-full rounded-xl bg-white/60 focus:ring-2 focus:ring-purple-500 ${
                errors.newPassword ? "border-red-500" : ""
              }`}
              placeholder="New Password"
              type="password"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            />
            {errors.newPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          {errors.general && (
            <p className="text-red-600 text-sm text-center">{errors.general}</p>
          )}

          <button
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-xl shadow-md hover:scale-105 transform transition-all duration-300"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}