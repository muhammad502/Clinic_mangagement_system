import { useState } from 'react';
import api from '../../servieces/api';

import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';


export default function ResetPassword() {
  const [form, setForm] = useState({otp:'', newPassword:'' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/reset-password', form);
      toast.success('Password reset successful');
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
      <input className="border p-2 w-full" placeholder="OTP"
        onChange={e=>setForm({...form,otp:e.target.value})}/>
      <input className="border p-2 w-full" placeholder="New Password" type="password"
        onChange={e=>setForm({...form,newPassword:e.target.value})}/>
      <button className="bg-purple-500 text-white p-2 w-full">Reset Password</button>
    </form>
  );
}
