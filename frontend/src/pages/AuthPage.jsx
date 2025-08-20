import { useState } from 'react';
// import GoogleSignInButton from '../components/authPage/GoogleSignInButton';
import SignInForm from '../components/authPage/SignInForm';
import SignUpForm from '../components/authPage/SignUpForm';
import cinemaBg from "../assets/cinema-bg.jpg";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      {/* Left Side – Background */}
      <div
        className="flex-1 hidden md:flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${cinemaBg})` }}
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

      {/* Right Side – Forms */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white px-8 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h1>

        {isLogin ? <SignInForm /> : <SignUpForm />}

        <p className="mt-4 text-sm text-black text-center">
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-red-600 hover:underline font-medium"
              >
                Sign up here
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-red-600 hover:underline font-medium"
              >
                Sign in here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}