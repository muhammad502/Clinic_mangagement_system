import { useState } from 'react';
import api from '../../servieces/api';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      toast.success('Registered successfully');
      navigate('/login'); // go to login after successful registration
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
        <button className="bg-blue-500 text-white p-2 w-full">
          Register
        </button>
      </form>

      <div className="text-center text-sm text-blue-600">
        <button
          onClick={() => navigate('/login')}
          className="hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
