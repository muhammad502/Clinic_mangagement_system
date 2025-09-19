import { useState } from 'react';
import api from '../../servieces/api';
import { useNavigate } from 'react-router-dom';


import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/forgot-password', { email });
      toast.success('OTP sent to your email');
      navigate('/resetPassword'); // go to reset page after OTP sent
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-yellow-500 text-white p-2 w-full">
        Send OTP
      </button>
    </form>
  );
}
