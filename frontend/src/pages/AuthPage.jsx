import { useState } from 'react';
import axios from 'axios';
import GoogleSignInButton from '../components/authPage/GoogleSignInButton';
import cinemaBg from "../assets/cinema-bg.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setForm({ name: '', email: '', password: '' });
    setError('');
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await axios.post(endpoint, form);
      console.log(isLogin ? 'Logged in:' : 'Registered:', res.data);
      // Store token, redirect, etc.
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      {/* Left Side – Background Image */}
      <div
        className="flex-1 hidden md:flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${cinemaBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 text-center px-8">
          <h2 className="text-white text-4xl font-extrabold leading-tight mb-4">
            Welcome to <br />
            <span className="text-red-500">Cinema Fanatics</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Explore movies, track your favorites, and connect with film lovers.
          </p>
        </div>
      </div>

      {/* Right Side – Auth Form */}
      <div className="flex-1 flex items-center justify-center bg-white text-gray-900 px-8 py-12">
        <div className="w-full sm:max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h1>

          {/* Form with animation */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "signup"}
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
            >
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-md hover:from-red-400 hover:to-red-500 transition"
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </motion.form>
          </AnimatePresence>

          <div className="my-6 text-center text-gray-500">OR</div>

          <GoogleSignInButton />

          <p className="mt-4 text-sm text-center">
            {isLogin ? (
              <>
                Don’t have an account?{' '}
                <button
                  onClick={toggleForm}
                  className="text-red-600 hover:underline font-medium"
                >
                  Sign up here
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={toggleForm}
                  className="text-red-600 hover:underline font-medium"
                >
                  Sign in here
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
