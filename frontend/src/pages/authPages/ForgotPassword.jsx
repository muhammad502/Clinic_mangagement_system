import { useState } from "react";
import api from "../../servieces/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("OTP sent to your email", {
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
      navigate("/resetPassword"); // go to reset page after OTP sent
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-purple-600 p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-sm bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-green-500 to-purple-600 bg-clip-text text-transparent">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <input
              className={`border p-2 w-full rounded-xl bg-white/60 focus:ring-2 focus:ring-purple-500 ${
                error ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>

          <button
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 transform transition-all duration-300"
            type="submit"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}