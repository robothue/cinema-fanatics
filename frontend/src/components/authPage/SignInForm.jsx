import { useState } from 'react';
import axios from 'axios';
import GoogleSignInButton from './GoogleSignInButton';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';

export default function SignInForm() {
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);

      // Fetch user info
      const me = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${res.data.token}` }
      });
      setUser(me.data);

      window.location.href = '/'; // redirect after login
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="w-full sm:max-w-md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-md bg-gray-100 border"
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-12 rounded-md bg-gray-100 border"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full py-3 bg-red-500 text-white rounded-md">
          Sign In
        </button>
      </form>

      <div className="my-6 text-center text-gray-500">OR</div>
      <GoogleSignInButton />
    </div>
  );
}
